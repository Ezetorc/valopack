import { useContext } from "react";
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

export default function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error("Context doesn't have a Provider");

  const { setBoard, board, selectedBox, targetBox, setEffects } = context;

  const getBoxes = (params: GetParams): Box[] => {
    switch (params.getType) {
      case "targetBox":
        if (targetBox) return [targetBox];
        break;
      case "selectedBox":
        if (selectedBox) return [selectedBox];
        break;
      case "range":
        if (!targetBox || !params.boxType || !params.range) return [];
        return getInRange(
          board,
          params.boxType,
          targetBox.position,
          params.range,
          params.team
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
      code: "",
      position: agentPosition,
    };

    setBoard(newBoard);
  };

  const applyDamage = (attacker: Player, target: Player) => {
    target.attributes.health -= attacker.attributes.attack;
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
      code: "",
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
    if (!isWithinRange(distance, ability.range)) return false;

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
    }

    if (success) {
      setBoard(newBoard);
    }

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
        console.log(newEffects);
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
      if (params.from.includes(box.type)) {
        box.type = params.to;
        success = true;
      }
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
  };
}
