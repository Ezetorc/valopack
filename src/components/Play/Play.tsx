import { useEffect, useState } from 'react'
import useSettings from '../../hooks/useSettings'
import PlayerInfo from '../PlayerInfo/PlayerInfo'
import getTeam from '../../utils/getTeam'
import useUser from '../../hooks/useUser'
import Actions from '../Actions/Actions'
import ResultModal from '../ResultModal/ResultModal'
import useBoard from '../../hooks/useBoard'
import { Result } from '../../types/Result'
import { sectionsBackgrounds } from '../../constants/sectionsBackground'
import BoardDisplay from '../BoardDisplay/BoardDisplay'
import './Play.css'

export default function Play () {
  const { squareFrom, setBoard, board } = useBoard()
  const { team } = useUser()
  const { texts, updateSection } = useSettings()
  const [showInfo, setShowInfo] = useState<boolean>(false)
  const [result, setResult] = useState<Result>(undefined)
  const [matchStarted, setMatchStarted] = useState(false)

  useEffect(() => {
    if (!matchStarted) {
      const { allyPlayers, enemyPlayers } = board.getTotalPlayers()

      if (allyPlayers !== 0 && enemyPlayers !== 0) return
      setBoard(board.getInitialized(team, getTeam()))
      setMatchStarted(true)
    }
  }, [board, setBoard, team, matchStarted])

  useEffect(() => {
    if (!matchStarted) return
    const gameResult: Result = board.getResult()
    setResult(gameResult)
  }, [board, matchStarted])

  useEffect(
    () => updateSection(texts.play, sectionsBackgrounds.play, false),
    [texts.play, updateSection]
  )

  return (
    <>
      {result && <ResultModal result={result} />}
      {showInfo && <PlayerInfo onClose={() => setShowInfo(false)} />}

      <section className='game'>
        <BoardDisplay />
        {squareFrom?.has('player') && (
          <Actions onOpenInfo={() => setShowInfo(true)} />
        )}
      </section>
    </>
  )
}
