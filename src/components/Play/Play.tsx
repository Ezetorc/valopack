import { useCallback, useEffect, useRef, useState } from "react";
import useSettings from "../../hooks/useSettings";
import { sectionsBg } from "../../constants/sectionsBg";
import useGame from "../../hooks/useGame";
import PlayerInfo from "../PlayerInfo/PlayerInfo";
import getTeam from "../../utils/getTeam";
import initializeBoard from "../../utils/initializeBoard";
import useUser from "../../hooks/useUser";
import Actions from "../Actions/Actions";
import Ability from "../../interfaces/Ability";
import { Team } from "../../types/Team";
import WinnerModal from "../WinnerModal/WinnerModal";
import Board from "../Board/Board";
import Player from "../../classes/Player";
import "./Play.css";

export default function Play() {
  const {
    map,
    action,
    setAction,
    selectedBox,
    setSelectedBox,
    targetBox,
    setTargetBox,
    movePlayer,
    canMakeAction,
    setBoard,
    attackPlayer,
    handleAbility,
    turn,
    setTurn,
    effects,
    setEffects,
    handleMethod,
    getTotalPlayers,
    selectedSquare,
  } = useGame();
  const { team } = useUser();
  const { texts, updateSection } = useSettings();
  const boardRef = useRef<HTMLDivElement>(null);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [winner, setWinner] = useState<Team | "draw" | undefined>(undefined);
  const [isInitialized, setIsInitialized] = useState(false);

  const changeTurn = useCallback(() => {
    const newTurn: Team = turn === "ally" ? "enemy" : "ally";
    setTurn(newTurn);

    effects.forEach((effect) => {
      if (effect.turnsLeft == 1) {
        effect.methods.forEach((method) => {
          handleMethod(method);
        });
      }
    });

    setEffects((prevEffects) => {
      const newEffects = prevEffects
        .map((effect) => ({
          ...effect,
          turnsLeft: effect.turnsLeft - 1,
        }))
        .filter((effect) => effect.turnsLeft > 0);

      return newEffects;
    });
  }, [setTurn, turn, setEffects, handleMethod, effects]);

  const showInvalidMove = () => {
    boardRef.current?.classList.add("invalid-move");
    setTimeout(() => {
      boardRef.current?.classList.remove("invalid-move");
    }, 300);
  };

  const resetActions = useCallback(() => {
    setAction(null);
    setSelectedBox(null);
    setTargetBox(null);
    setShowActions(false);
    changeTurn();
  }, [setAction, setSelectedBox, setTargetBox, changeTurn]);

  const handleMoveAction = useCallback(() => {
    if (!selectedBox || !selectedSquare || !targetBox || action !== "move")
      return;

    const isSquareFree: boolean = selectedSquare.boxes.every((box) => box.free);
    const selectedPlayer: Player = selectedBox as Player;
    const isMoveValid: boolean =
      isSquareFree &&
      canMakeAction(selectedPlayer, targetBox, selectedPlayer.attributes.speed);

    if (isMoveValid) {
      movePlayer(selectedBox as Player, targetBox);
      resetActions();
    } else {
      showInvalidMove();
      setTargetBox(null);
    }
  }, [
    action,
    selectedBox,
    targetBox,
    movePlayer,
    resetActions,
    setTargetBox,
    canMakeAction,
    selectedSquare,
  ]);

  const handleAbilityAction = useCallback(() => {
    const isAbility: boolean = action == "ability0" || action == "ability1";
    if (!selectedBox || !targetBox || !isAbility) return;

    const selectedPlayer: Player = selectedBox as Player;
    const ability: Ability =
      action == "ability0"
        ? selectedPlayer.agent.abilities[0]
        : selectedPlayer.agent.abilities[1];

    if (ability) {
      if (handleAbility(ability)) {
        resetActions();
      } else {
        // Can't execute ability
        showInvalidMove();
        setTargetBox(null);
      }
    } else {
      // Invalid ability or function not found
      showInvalidMove();
      setTargetBox(null);
    }
  }, [
    action,
    selectedBox,
    targetBox,
    resetActions,
    setTargetBox,
    handleAbility,
  ]);

  const handleAttackAction = useCallback(() => {
    if (!selectedBox || !targetBox || action !== "attack") return;

    const selectedPlayer: Player = selectedBox as Player;
    const isTargetPlayer: boolean = targetBox.type == "player";
    const isTargetEnemy: boolean = (targetBox as Player).team == "enemy";
    const isAttackValid: boolean =
      isTargetPlayer &&
      isTargetEnemy &&
      canMakeAction(selectedPlayer, targetBox, 1);

    if (isAttackValid) {
      attackPlayer(selectedPlayer, targetBox as Player);
      resetActions();
    } else {
      showInvalidMove();
      setTargetBox(null);
    }
  }, [
    action,
    selectedBox,
    targetBox,
    canMakeAction,
    attackPlayer,
    resetActions,
    setTargetBox,
  ]);

  useEffect(() => handleMoveAction(), [handleMoveAction]);
  useEffect(() => handleAttackAction(), [handleAttackAction]);
  useEffect(() => handleAbilityAction(), [handleAbilityAction]);

  useEffect(
    () => setBoard(initializeBoard(map, team, getTeam())),
    [map, team, setBoard]
  );

  useEffect(() => {
    const { allyPlayers, enemyPlayers } = getTotalPlayers();

    if (allyPlayers > 0 || enemyPlayers > 0) {
      setIsInitialized(true);
    }
  }, [getTotalPlayers]);

  useEffect(() => {
    if (!isInitialized) return;

    const { allyPlayers, enemyPlayers } = getTotalPlayers();

    if (allyPlayers === 0 && enemyPlayers > 0) {
      setWinner("enemy");
    } else if (enemyPlayers === 0 && allyPlayers > 0) {
      setWinner("ally");
    } else if (allyPlayers === 0 && enemyPlayers === 0) {
      setWinner("draw");
    }
  }, [getTotalPlayers, isInitialized]);

  useEffect(() => {
    updateSection(texts.play, sectionsBg.play, false);
  }, [texts.play, updateSection]);

  return (
    <>
      {winner && <WinnerModal winner={winner} />}
      {showInfo && <PlayerInfo onClose={() => setShowInfo(false)} />}

      <section className="game">
        <Board setShowActions={setShowActions} boardRef={boardRef} />
        {showActions && <Actions onOpenInfo={() => setShowInfo(true)} />}
      </section>
    </>
  );
}
