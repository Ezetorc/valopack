import Box from '../../classes/Box'
import Player from '../../classes/Player'
import './BoxDisplay.css'

interface BoxDisplayProps {
  box: Box
  opacity: number
}

export default function BoxDisplay ({ box, opacity }: BoxDisplayProps) {
  const isPlayer = box.type === 'player'
  const player = isPlayer ? (box as Player) : null
  const flip = isPlayer ? (player?.team == 'ally' ? 1 : -1) : 1
  const team = player ? player.team : ''

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
