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
import { Card } from '../../../models/Card.ts'
import { Agent } from '../../../models/Agent.ts'
import { Board } from '../models/Board.ts'
import { Inventory } from '../../../models/Inventory.ts'

export default function Play () {
  const { getSquareFrom, setBoard, getBoard } = useBoard()
  const [infoVisible, setInfoVisible] = useState<boolean>(false)
  const [matchStarted, setMatchStarted] = useState(false)
  const [result, setResult] = useState<Result>(undefined)
  const { updatePage } = useSettings()
  const { getInventory, addCredits, removeCredits } = useUser()
  const inventory: Inventory = getInventory()

  useEffect(() => {
    updatePage('play')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const initialize = async () => {
      if (!matchStarted) {
        const board: Board = getBoard()
        const { allyPlayers, enemyPlayers } = board.getTotalPlayers()

        if (allyPlayers !== 0 && enemyPlayers !== 0) return

        const enemyAgents: Agent[] = await Agents.getMixed(5)
        const enemyTeam: Card[] = Agents.getCardsFromAgents(enemyAgents)
        const allyTeam: Card[] = inventory.getCardsInTeam()
        const initializedBoard: Board = board.getInitialized(
          allyTeam,
          enemyTeam
        )

        setBoard(initializedBoard)
        setMatchStarted(true)
      }
    }

    initialize()
  }, [getBoard, setBoard, inventory, matchStarted])

  useEffect(() => {
    if (!matchStarted) return

    const board: Board = getBoard()
    const gameResult: Result = board.getResult()

    if (!result) return

    setResult(gameResult)

    if (gameResult === 'ally') {
      addCredits(1000)
    } else if (gameResult === 'enemy') {
      removeCredits(500)
    } else if (gameResult === 'draw') {
      addCredits(500)
    }
  }, [getBoard, matchStarted, result, addCredits, removeCredits])

  return (
    <>
      {result && <ResultModal result={result} />}
      {infoVisible && <PlayerInfo onClose={() => setInfoVisible(false)} />}

      <main className='w-full h-[100dvh] grid p-[1%] gap-[1%] grid-rows-[1fr,_1fr] place-items-center'>
        <BoardDisplay />
        {getSquareFrom()?.hasEntityWithType('player') && (
          <Actions onOpenInfo={() => setInfoVisible(true)} />
        )}
      </main>
    </>
  )
}
