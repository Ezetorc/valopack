import { TeamSide } from '../../../models/TeamSide.ts'
import { Box } from '../models/Box.ts'
import { Player } from '../models/Player.ts'
import './BoxDisplay.css'

interface BoxDisplayProps {
  box: Box
  opacity: number
}

export function BoxDisplay ({ box, opacity }: BoxDisplayProps) {
  const isPlayer: boolean = box.type === 'player'
  const player: Player | null = isPlayer ? (box as Player) : null
  const flip: number = isPlayer ? (player?.teamSide == 'ally' ? 1 : -1) : 1
  const teamSide: TeamSide | '' = player ? player.teamSide : ''

  return (
    <div
      className={`box-display ${box.type} ${teamSide}`}
      style={{ transform: `scaleX(${flip})`, opacity: opacity }}
    >
      {isPlayer && player?.card && (
        <img src={player.card.icon} alt={player.card.name} />
      )}
    </div>
  )
}
