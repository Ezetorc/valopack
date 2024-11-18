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
import { Team } from '../../../models/Team.ts'

export default function Play () {
  const { squareFrom, setBoard, board } = useBoard()
  const [infoVisible, setInfoVisible] = useState<boolean>(false)
  const [matchStarted, setMatchStarted] = useState(false)
  const [result, setResult] = useState<Result>(undefined)
  const { texts, updateSection } = useSettings()
  const { team: allyTeam } = useUser()

  useEffect(() => {
    const initialize = async () => {
      if (!matchStarted) {
        const { allyPlayers, enemyPlayers } = board.getTotalPlayers()

        if (allyPlayers !== 0 && enemyPlayers !== 0) return
        const enemyTeam = Agents.getCardsFromAgents(await Agents.getMixed(5)) as Team
        setBoard(board.getInitialized(allyTeam, enemyTeam))
        setMatchStarted(true)
      }
    }

    initialize()
  }, [board, setBoard, allyTeam, matchStarted])

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

      <section className='w-full h-[100dvh] grid p-[1%] gap-[1%] grid-rows-[1fr,_1fr] place-items-center'>
        <BoardDisplay />
        {squareFrom?.hasEntity('player') && (
          <Actions onOpenInfo={() => setInfoVisible(true)} />
        )}
      </section>
    </>
  )
}
