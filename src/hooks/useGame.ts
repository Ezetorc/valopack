import { useCallback, useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import getDistance from "../utils/getDistance";
import Box from "../interfaces/Box";
import Player from "../interfaces/Player";
import getBoardCopy from "../utils/getBoardCopy";
import Ability from "../interfaces/Ability";
import Method from "../interfaces/Method";
import ReplaceParams from "../interfaces/MethodParams/ReplaceParams";
import GetParams from "../interfaces/MethodParams/GetParams";
import getInRange from "../utils/getInRange";
import ModifyAttributeParams from "../interfaces/MethodParams/ModifyAttributeParams";
import WaitParams from "../interfaces/MethodParams/WaitParams";
import AffectParams from "../interfaces/MethodParams/AffectParams";

export default function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error("Context doesn't have a Provider");

  const { setBoard, board, selectedBox, targetBox, setEffects } = context;

  const getTotalPlayers = useCallback(() => {
    return board.grid.flat().reduce(
      (acc, box) => {
        if (box.type === "player") {
          const { team } = box as Player;
          if (team === "ally") acc.allyPlayers++;
          else acc.enemyPlayers++;
        }
        return acc;
      },
      { allyPlayers: 0, enemyPlayers: 0 }
    );
  }, [board.grid]);

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
        return board.grid
          .flat()
          .filter((box) =>
            box.codes.some((code) =>
              (params.affectedCodes ?? []).includes(code)
            )
          );
    }

    return [];
  };

  const attackPlayer = (selectedAgent: Player, targetAgent: Player) => {
    if (isInAttackRange(selectedAgent, targetAgent)) {
      applyDamage(selectedAgent, targetAgent);
    }
  };

  const isInAttackRange = (selectedAgent: Player, targetAgent: Player) => {
    const attackDistance = 1;
    return (
      getDistance(selectedAgent.position, targetAgent.position) ===
      attackDistance
    );
  };

  const killAgent = (player: Player) => {
    const newBoard = getBoardCopy(board);
    const agentPosition = { ...player.position };

    newBoard.grid[agentPosition.y][agentPosition.x] = {
      type: "empty",
      free: true,
      codes: [""],
      position: agentPosition,
    };

    setBoard(newBoard);
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

  const canMakeAction = (
    selectedPlayer: Player,
    targetBox: Box,
    maxDistance: number
  ) => {
    return (
      getDistance(selectedPlayer.position, targetBox.position) <= maxDistance
    );
  };

  const movePlayer = (selectedPlayer: Player, targetBox: Box) => {
    const newBoard = getBoardCopy(board);
    const targetPosition = { ...targetBox.position };
    const playerPosition = selectedPlayer.position;

    newBoard.grid[targetPosition.y][targetPosition.x] = {
      ...selectedPlayer,
      position: targetPosition,
    };

    newBoard.grid[playerPosition.y][playerPosition.x] = {
      type: "empty",
      free: true,
      codes: [""],
      position: playerPosition,
    };
    setBoard(newBoard);
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

    if ("get" in params) {
      if (params.get.getType === "affected") {
        const affectParams = params as AffectParams;
        const affectedBoxes = getBoxes(params.get);

        affectedBoxes.forEach((box) => {
          box.codes = box.codes.filter(
            (code) => !(affectParams.affectedCodes ?? []).includes(code)
          );
        });
      }
    }

    switch (type) {
      case "replace":
        success = handleReplaceMethod(params as ReplaceParams);
        break;
      case "modifyAttribute":
        success = handleModifyAttributeMethod(params as ModifyAttributeParams);
        break;
      case "wait":
        success = handleWaitMethod(params as WaitParams);
        break;
      case "affect":
        success = handleAffectMethod(params as AffectParams);
        break;
    }

    if (success) {
      setBoard(newBoard);
    }

    return success;
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

  const handleModifyAttributeMethod = (params: ModifyAttributeParams) => {
    const boxes = getBoxes(params.get);
    let success = false;

    boxes.forEach((box) => {
      if (box.type == "player") {
        const player = box as Player;
        player.attributes[params.attribute] += params.amount;
        success = true;
      }
    });

    return success;
  };

  const handleReplaceMethod = (params: ReplaceParams): boolean => {
    const boxes = getBoxes(params.get);
    let success = false;

    boxes.forEach((box) => {
      box.type = params.to;
      success = true;
    });

    return success;
  };

  return {
    ...context,
    canMakeAction,
    movePlayer,
    attackPlayer,
    handleAbility,
    handleMethod,
    getTotalPlayers,
  };
}
