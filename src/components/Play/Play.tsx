import { useCallback, useEffect, useRef, useState } from "react";
import useSettings from "../../hooks/useSettings";
import { sectionsBg } from "../../constants/sectionsBg";
import BoxDisplay from "../BoxDisplay/BoxDisplay";
import getBackgroundColor from "../../utils/getBackgroundColor";
import Box from "../../interfaces/Box";
import useGame from "../../hooks/useGame";
import Player from "../../interfaces/Player";
import PlayerInfo from "../PlayerInfo/PlayerInfo";
import getTeam from "../../utils/getTeam";
import initializeBoard from "../../utils/initializeBoard";
import useUser from "../../hooks/useUser";
import Actions from "../Actions/Actions";
import Ability from "../../interfaces/Ability";
import { Team } from "../../types/Team";
import WinnerModal from "../WinnerModal/WinnerModal";
import "./Play.css";

export default function Play() {
  const {
    board,
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
  } = useGame();
  const { team } = useUser();
  const { texts, updateSection } = useSettings();
  const boardRef = useRef<HTMLDivElement>(null);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [winner, setWinner] = useState<Team | "draw" | undefined>(undefined);
  const [isInitialized, setIsInitialized] = useState(false); // Estado para verificar si el juego ha sido inicializado

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
    if (!selectedBox || !targetBox || action !== "move") return;

    const selectedPlayer = selectedBox as Player;
    const isMoveValid =
      targetBox.free &&
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
  ]);

  const handleAbilityAction = useCallback(() => {
    const isAbility = action == "ability0" || action == "ability1";
    if (!selectedBox || !targetBox || !isAbility) return;

    const selectedPlayer = selectedBox as Player;
    const ability: Ability =
      action == "ability0"
        ? selectedPlayer.agent.abilities[0]
        : selectedPlayer.agent.abilities[1];

    if (ability) {
      if (handleAbility(ability)) {
        resetActions();
      } else {
        console.log("Can't execute ability", ability);
        showInvalidMove();
        setTargetBox(null);
      }
    } else {
      console.log("Invalid ability or function not found", ability);
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

    const selectedPlayer = selectedBox as Player;
    const isAttackValid =
      targetBox.type == "player" &&
      (targetBox as Player).team == "enemy" &&
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

  const handleClick = useCallback(
    (box: Box) => {
      if (box.type != "player" && action && targetBox) {
        setSelectedBox(null);
        setShowActions(false);
      } else {
        if (!selectedBox && box.type == "player") {
          setSelectedBox(box);
          setShowActions(true);
        } else {
          if (action) {
            setTargetBox(box);
          } else if (box.type != "player") {
            setSelectedBox(null);
            setShowActions(false);
          } else {
            setSelectedBox(box);
            setShowActions(true);
          }
        }
      }
    },
    [
      selectedBox,
      setSelectedBox,
      setShowActions,
      setTargetBox,
      action,
      targetBox,
    ]
  );

  useEffect(() => handleMoveAction(), [handleMoveAction]);
  useEffect(() => handleAttackAction(), [handleAttackAction]);
  useEffect(() => handleAbilityAction(), [handleAbilityAction]);

  useEffect(
    () => setBoard(initializeBoard(map, team, getTeam())),
    [map, team, setBoard]
  );

  // Verificación de inicialización
  useEffect(() => {
    const { allyPlayers, enemyPlayers } = getTotalPlayers();

    if (allyPlayers > 0 || enemyPlayers > 0) {
      setIsInitialized(true); // Juego inicializado
    }
  }, [getTotalPlayers]);

  // Lógica para definir el ganador, solo si el juego está inicializado
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
        <div className="game__board" ref={boardRef}>
          {board.grid.map((row, rowIndex) =>
            row.map((box, boxIndex) => (
              <BoxDisplay
                onClick={() => handleClick(box)}
                key={`${rowIndex}-${boxIndex}`}
                box={box}
                bgColor={getBackgroundColor(box, map)}
              />
            ))
          )}
        </div>

        {showActions && <Actions onOpenInfo={() => setShowInfo(true)} />}
      </section>
    </>
  );
}
