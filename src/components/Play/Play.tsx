import { useCallback, useEffect, useRef, useState } from 'react'
import useSettings from '../../hooks/useSettings'
import { sectionsBg } from '../../constants/sectionsBg'
import PlayerInfo from '../PlayerInfo/PlayerInfo'
import getTeam from '../../utils/getTeam'
import initializeBoard from '../../utils/initializeBoard'
import useUser from '../../hooks/useUser'
import Actions from '../Actions/Actions'
import ResultModal from '../ResultModal/ResultModal'
import Board from '../Board/Board'
import { boards } from '../../constants/boards'
import useBoard from '../../hooks/useBoard'
import Player from '../../classes/Player'
import isValidDistance from '../../utils/isValidDistance'
import { Result } from '../../types/Result'
import './Play.css'

export default function Play () {
  const {
    getTotalPlayers,
    getResult,
    movePlayer,
    squareTo,
    squareFrom,
    action,
    setBoard,
    resetActions,
    attackPlayer,
    setSquareTo,
  } = useBoard()
  const { team } = useUser()
  const { texts, updateSection } = useSettings()
  const boardRef = useRef<HTMLDivElement>(null)
  const [showInfo, setShowInfo] = useState<boolean>(false)
  const [result, setResult] = useState<Result>(undefined)
  const [isInitialized, setIsInitialized] = useState(false)
  const [map] = useState<string>('bind')

  // const changeTurn = useCallback(() => {
  //   const newTurn: Team = turn === "ally" ? "enemy" : "ally";
  //   setTurn(newTurn);

  //   effects.forEach((effect) => {
  //     if (effect.turnsLeft != 1) return;
  //     effect.methods.forEach((method) => handleMethod(method));
  //   });

  //   setEffects((prevEffects) => {
  //     const newEffects = prevEffects.map((effect) => ({
  //       ...effect,
  //       turnsLeft: effect.turnsLeft - 1,
  //     }));

  //     const filteredEffects = newEffects.filter(
  //       (effect) => effect.turnsLeft > 0
  //     );

  //     return filteredEffects;
  //   });
  // }, [setTurn, turn, setEffects, handleMethod, effects]);

  const showInvalidMove = () => {
    boardRef.current?.classList.add('invalid-move')
    setTimeout(() => boardRef.current?.classList.remove('invalid-move'), 300)
  }

  const handleMoveAction = useCallback(() => {
    if (!squareFrom || !squareTo || action !== 'move') return
    const player = squareFrom.get('player') as Player
    if (!player) return

    const validDistance = isValidDistance(
      squareFrom.position,
      squareTo.position,
      player.attributes.speed
    )

    const canMove = validDistance && squareTo.isFree()

    if (canMove) {
      movePlayer(player, squareTo)
      resetActions()
    } else {
      showInvalidMove()
    }
  }, [movePlayer, squareFrom, squareTo, action, resetActions])

  const handleAttackAction = useCallback(() => {
    if (!squareFrom || !squareTo || action !== 'attack') return

    const playerTo = squareTo.get('player') as Player
    const isAttackValid: boolean =
      playerTo &&
      playerTo.team == 'enemy' &&
      isValidDistance(squareFrom.position, squareTo.position, 1)

    if (isAttackValid) {
      const playerFrom = squareFrom.get('player') as Player
      attackPlayer(playerFrom, playerTo)
      resetActions()
    } else {
      showInvalidMove()
      setSquareTo(null)
    }
  }, [action, attackPlayer, resetActions, setSquareTo, squareFrom, squareTo])

  useEffect(() => handleMoveAction(), [handleMoveAction])
  useEffect(() => handleAttackAction(), [handleAttackAction])

  useEffect(
    () => setBoard(initializeBoard(boards[map], team, getTeam())),
    [team, setBoard, map]
  )

  useEffect(() => {
    const { allyPlayers, enemyPlayers } = getTotalPlayers()
    if (allyPlayers > 0 || enemyPlayers > 0) {
      setIsInitialized(true)
    }
  }, [getTotalPlayers])

  useEffect(() => {
    if (!isInitialized) return
    const gameResult = getResult()
    setResult(gameResult)
  }, [getResult, isInitialized])

  useEffect(
    () => updateSection(texts.play, sectionsBg.play, false),
    [texts.play, updateSection]
  )

  return (
    <>
      {result && <ResultModal result={result} />}
      {showInfo && <PlayerInfo onClose={() => setShowInfo(false)} />}

      <section className='game'>
        <Board boardRef={boardRef} />
        {squareFrom?.has('player') && (
          <Actions onOpenInfo={() => setShowInfo(true)} />
        )}
      </section>
    </>
  )
}
