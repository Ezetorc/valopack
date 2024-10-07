import { useCallback, useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import getDistance from "../utils/getDistance";
import getBoardCopy from "../utils/getBoardCopy";
import Ability from "../interfaces/Ability";
import Method from "../interfaces/Method";
import ReplaceParams from "../interfaces/MethodParams/ReplaceParams";
import GetParams from "../interfaces/MethodParams/GetParams";
import getInRange from "../utils/getInRange";
import ModifyAttributeParams from "../interfaces/MethodParams/ModifyAttributeParams";
import WaitParams from "../interfaces/MethodParams/WaitParams";
import AffectParams from "../interfaces/MethodParams/AffectParams";
import AddParams from "../interfaces/MethodParams/AddParams";
import RemoveParams from "../interfaces/MethodParams/RemoveParams";
import Box from "../classes/Box";
import Player from "../classes/Player";
import Square from "../classes/Square";
import { MethodParams } from "../types/MethodParams";

export default function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error("Context doesn't have a Provider");

  const { setBoard, board, selectedBox, targetBox, setEffects } = context;

  const getTotalPlayers = useCallback(() => {
    return board.grid.flat().reduce(
      (acc, square) => {
        square.boxes.forEach((box) => {
          if (box.type === "player") {
            const { team } = box as Player;
            if (team === "ally") acc.allyPlayers++;
            else acc.enemyPlayers++;
          }
        });
        return acc;
      },
      { allyPlayers: 0, enemyPlayers: 0 }
    );
  }, [board.grid]);

  const canMakeAction = (
    selectedPlayer: Player,
    targetBox: Box,
    maxDistance: number
  ) => {
    const distance = getDistance(selectedPlayer.position, targetBox.position);
    return distance <= maxDistance;
  };

  const movePlayer = (selectedPlayer: Player, targetBox: Box) => {
    const newBoard = getBoardCopy(board);
    const targetPosition = { ...targetBox.position };
    const playerPosition = selectedPlayer.position;

    const targetSquare = newBoard.grid[targetPosition.y][targetPosition.x];
    const playerSquare = newBoard.grid[playerPosition.y][playerPosition.x];

    targetSquare.boxes.push({ ...selectedPlayer, position: targetPosition });

    playerSquare.boxes = playerSquare.boxes.filter(
      (box) => box !== selectedPlayer
    );

    setBoard(newBoard);
  };

  const attackPlayer = (selectedAgent: Player, targetAgent: Player) => {
    if (isInAttackRange(selectedAgent, targetAgent)) {
      applyDamage(selectedAgent, targetAgent);
    }
  };

  const applyDamage = (attacker: Player, target: Player) => {
    const damage = Math.max(
      attacker.attributes.attack - target.attributes.defense,
      0
    );

    target.attributes.health -= damage;

    if (target.attributes.health <= 0) {
      killAgent(target);
    }
  };

  const killAgent = (player: Player) => {
    const newBoard = getBoardCopy(board);
    const agentPosition = { ...player.position };

    const square = newBoard.grid[agentPosition.y][agentPosition.x];
    square.boxes = square.boxes.filter((box) => box !== player);

    setBoard(newBoard);
  };

  const isInAttackRange = (selectedAgent: Player, targetAgent: Player) => {
    const attackDistance = 1;
    return (
      getDistance(selectedAgent.position, targetAgent.position) ===
      attackDistance
    );
  };

  const getBoxes = (params: GetParams): Box[] => {
    switch (params.getType) {
      case "targetBox":
        if (targetBox && params.boxTypes?.includes(targetBox.type)) {
          return [targetBox];
        }
        break;
      case "selectedBox":
        if (selectedBox && params.boxTypes?.includes(selectedBox.type)) {
          return [selectedBox];
        }
        break;
      case "range":
        if (!targetBox || !params.boxTypes || !params.range) return [];
        return getInRange(
          board,
          params.boxTypes,
          targetBox.position,
          params.range,
          params.team
        );
      case "affected":
        return board.grid.flatMap((row) =>
          row.flatMap((square) =>
            square.boxes.filter((box) =>
              box.codes.some((code: string) =>
                (params.affectedCodes ?? []).includes(code)
              )
            )
          )
        );
    }

    return [];
  };

  const isWithinRange = (distance: number, range: [number, number]) => {
    const [min, max] = range;
    return distance >= min && distance <= max;
  };

  const handleAbility = (ability: Ability): boolean => {
    if (!selectedBox || !targetBox) return false;
    const distance = getDistance(selectedBox.position, targetBox.position);
    if (
      !isWithinRange(distance, ability.range) ||
      !ability.boxTypes.includes(targetBox.type)
    )
      return false;

    let abilitySuccess = false;

    ability.methods.forEach((method) => {
      const methodSuccess = handleMethod(method);
      if (methodSuccess) {
        abilitySuccess = true;
      }
    });

    return abilitySuccess;
  };

  const handleMethod = (method: Method): boolean => {
    if (!selectedBox || !targetBox) return false;

    const newBoard = getBoardCopy(board);
    const { params, type } = method;
    let success = false;
    removeAffectedCodes(params);

    const handler = methodHandlers[type];
    if (handler) success = handler(params);
    if (success) setBoard(newBoard);

    return success;
  };

  const methodHandlers: Record<string, (params: MethodParams) => boolean> = {
    replace: (params: MethodParams) =>
      handleReplaceMethod(params as ReplaceParams),
    modifyAttribute: (params: MethodParams) =>
      handleModifyAttributeMethod(params as ModifyAttributeParams),
    wait: (params: MethodParams) => handleWaitMethod(params as WaitParams),
    affect: (params: MethodParams) =>
      handleAffectMethod(params as AffectParams),
    add: (params: MethodParams) => handleAddMethod(params as AddParams),
    remove: (params: MethodParams) =>
      handleRemoveMethod(params as RemoveParams),
  };

  const handleAffectMethod = (params: AffectParams) => {
    const boxes = getBoxes(params.get);
    let success = false;

    boxes.forEach((box) => {
      box.codes.push(...params.affectedCodes);
      success = true;
    });

    return success;
  };

  const handleWaitMethod = (params: WaitParams) => {
    if (params.type == "miliseconds") {
      setTimeout(() => {
        params.methods.forEach((method) => handleMethod(method));
      }, params.time);
    } else if (params.type == "turns") {
      setEffects((prevEffects) => {
        const newEffects = [
          ...prevEffects,
          {
            methods: params.methods,
            turnsLeft: params.time,
          },
        ];
        return newEffects;
      });
    }

    return true;
  };

  const handleReplaceMethod = (params: ReplaceParams): boolean => {
    const boxes = getBoxes(params.get);
    let success = false;

    boxes.forEach((box) => {
      const square = board.grid[box.position.y][box.position.x];
      const boxIndex = square.boxes.indexOf(box);

      square.boxes[boxIndex].type = params.to;
      success = true;
    });

    return success;
  };

  const handleAddMethod = (params: AddParams): boolean => {
    const boxes = getBoxes(params.get);
    let success = false;

    boxes.forEach((box) => {
      const square: Square = board.grid[box.position.y][box.position.x];
      const allyInSquare: Box | undefined = square.boxes.find(
        (box) => box.type == "player" && (box as Player).team == "ally"
      );

      const newBox = new Box({
        position: square.position,
        type: params.boxType,
      });

      if (allyInSquare) {
        square.boxes.unshift(newBox);
      } else {
        square.boxes.push(newBox);
      }
      success = true;
    });

    return success;
  };

  const handleRemoveMethod = (params: RemoveParams): boolean => {
    const boxes = getBoxes(params.get);
    let success = false;

    boxes.forEach((box) => {
      const square = board.grid[box.position.y][box.position.x];
      square.boxes = square.boxes.filter((b) => b !== box);
      success = true;
    });

    return success;
  };

  const handleModifyAttributeMethod = (params: ModifyAttributeParams) => {
    const boxes = getBoxes(params.get);
    let success = false;

    boxes.forEach((box) => {
      if (box.type == "player") {
        const square = board.grid[box.position.y][box.position.x];
        const player = square.boxes.find((b) => b === box) as Player;
        player.attributes[params.attribute] += params.amount;
        success = true;
      }
    });

    return success;
  };

  const removeAffectedCodes = (params: MethodParams) => {
    if ("get" in params) {
      const boxes = getBoxes(params.get as GetParams);
      boxes.forEach((box) => {
        box.codes = box.codes.filter(
          (code) => !(params as AffectParams).affectedCodes.includes(code)
        );
      });
    }
  };

  return {
    getTotalPlayers,
    canMakeAction,
    movePlayer,
    attackPlayer,
    applyDamage,
    killAgent,
    isInAttackRange,
    getBoxes,
    isWithinRange,
    handleAbility,
    handleMethod,
    ...context,
  };
}
