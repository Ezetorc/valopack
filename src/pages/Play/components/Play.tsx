import { useEffect, useState } from 'react'
import { useSettings } from '../../../hooks/useSettings'
import { useUser } from '../../../hooks/useUser'
import { useBoard } from '../hooks/useBoard'
import { Result } from '../models/Result'
import { Actions } from './Actions'
import { BoardDisplay } from './BoardDisplay'
import { PlayerInfo } from './PlayerInfo'
import { ResultModal } from './ResultModal'
import './Play.css'
import { Agents } from '../../../services/Agents.service'
import { backgrounds } from '../../../valopack.config'

export default function Play () {
  const { squareFrom, setBoard, board } = useBoard()
  const [infoVisible, setInfoVisible] = useState<boolean>(false)
  const [matchStarted, setMatchStarted] = useState(false)
  const [result, setResult] = useState<Result>(undefined)
  const { texts, updateSection } = useSettings()
  const { team } = useUser()

  useEffect(() => {
    const initialize = async () => {
      if (!matchStarted) {
        const { allyPlayers, enemyPlayers } = board.getTotalPlayers()

        if (allyPlayers !== 0 && enemyPlayers !== 0) return
        const enemyTeam = await Agents.getTeam()
        setBoard(board.getInitialized(team, enemyTeam))
        setMatchStarted(true)
      }
    }

    initialize()
  }, [board, setBoard, team, matchStarted])

  useEffect(() => {
    if (!matchStarted) return
    const gameResult: Result = board.getResult()
    setResult(gameResult)
  }, [board, matchStarted])

  useEffect(
    () => updateSection(texts.play, backgrounds.play, false),
    [texts.play, updateSection]
  )

  return (
    <>
      {result && <ResultModal result={result} />}
      {infoVisible && <PlayerInfo onClose={() => setInfoVisible(false)} />}

      <section className='game'>
        <BoardDisplay />
        {squareFrom?.hasBox('player') && (
          <Actions onOpenInfo={() => setInfoVisible(true)} />
        )}
      </section>
    </>
  )
}
