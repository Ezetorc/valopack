import { useEffect, useState } from 'react'
import { useSettings } from '../../../hooks/useSettings.ts'
import { useUser } from '../../../hooks/useUser.ts'
import { useBoard } from '../hooks/useBoard.ts'
import { Result } from '../models/Result.ts'
import { Actions } from './Actions.tsx'
import { BoardDisplay } from './BoardDisplay.tsx'
import { PlayerInfo } from './PlayerInfo.tsx'
import { ResultModal } from './ResultModal.tsx'
import { Agents } from '../../../services/Agents.service.ts'
import { backgrounds } from '../../../valopack.config.ts'
import './Play.css'

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
        const enemyTeam = await Agents.getMixed(5)
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
