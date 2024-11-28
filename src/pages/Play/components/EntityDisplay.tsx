import { TeamSide } from '../../../models/TeamSide.ts'
import { maxHealth, teamColors } from '../../../valopack.config.ts'
import { Entity } from '../models/Entity.ts'
import { Player } from '../models/Player.ts'
import { clsx } from 'clsx'

interface EntityDisplayProps {
  entity: Entity
  opacity: number
}

export function EntityDisplay ({ entity, opacity }: EntityDisplayProps) {
  const isPlayer: boolean = entity.type === 'player'
  const player: Player | null = isPlayer ? (entity as Player) : null
  const flip: number = isPlayer ? (player?.teamSide === 'ally' ? 1 : -1) : 1
  const teamSide: TeamSide | null = player
    ? (player.teamSide as TeamSide)
    : null

  const healthPercent: number = player
    ? (player.attributes.health / maxHealth) * 100
    : 0

  const clsxClassName = {
    'bg-[url("src/pages/Play/assets/images/box.webp")]': entity.type === 'box',
    'bg-[url("src/pages/Play/assets/images/stim_beacon.webp")]':
      entity.type === 'stimBeacon',
    'bg-blue-gradient': entity.type === 'skySmoke'
  }

  return (
    <div
      className={clsx(
        'w-full aspect-square flex justify-center items-center text-[#ffffff24] text-[clamp(30px,_3vw,_40px)] bg-center bg-contain bg-no-repeat relative',
        clsxClassName
      )}
      style={{
        transform: `scaleX(${flip})`,
        opacity: opacity
      }}
    >
      {isPlayer && player && (
        <img className='w-full' src={player.icon} alt={player.name} />
      )}
      {isPlayer && teamSide && (
        <div
          className='absolute bottom-0 left-0 h-[5px] w-full'
          style={{
            background: `linear-gradient(to right, ${teamColors[teamSide]} ${healthPercent}%, transparent ${healthPercent}%)`
          }}
        />
      )}
    </div>
  )
}
