import { Box } from '../models/Box.ts'
import { Player } from '../models/Player.ts'
import { Team } from '../../../models/Team.ts'
import './BoxDisplay.css'

interface BoxDisplayProps {
  box: Box
  opacity: number
}

export function BoxDisplay ({ box, opacity }: BoxDisplayProps) {
  const isPlayer: boolean = box.type === 'player'
  const player: Player | null = isPlayer ? (box as Player) : null
  const flip: number = isPlayer ? (player?.team == 'ally' ? 1 : -1) : 1
  const team: Team | '' = player ? player.team : ''

  return (
    <div
      className={`box-display ${box.type} ${team}`}
      style={{ transform: `scaleX(${flip})`, opacity: opacity }}
    >
      {isPlayer && player?.agent && (
        <img src={player.agent.icon} alt={player.agent.name} />
      )}
    </div>
  )
}
