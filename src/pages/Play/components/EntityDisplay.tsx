import { TeamSide } from '../../../models/TeamSide.ts'
import { maxHealth, teamColors } from '../../../valopack.config.ts'
import { Entity } from '../models/Entity.ts'
import { Player } from '../models/Player.ts'

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

  const images: { [key in Entity['type']]: string } = {
    box: 'src/pages/Play/assets/images/box.webp',
    stimBeacon: 'src/pages/Play/assets/images/stim_beacon.webp',
    skySmoke: 'src/pages/Play/assets/images/sky_smoke.webp',
    player: player?.icon || ''
  }

  return (
    <div
      className={
        'w-full aspect-square flex justify-center items-center text-[#ffffff24] text-[clamp(30px,_3vw,_40px)] bg-center bg-contain bg-no-repeat absolute'
      }
      style={{
        transform: `scaleX(${flip})`,
        opacity: opacity
      }}
    >
      <img
        className='w-full absolute z-[27]'
        src={images[entity.type]}
        alt={entity.type}
      />

      {isPlayer && teamSide && (
        <div
          className='absolute z-[30] bottom-0 left-0 h-[5px] w-full'
          style={{
            background: `linear-gradient(to right, ${teamColors[teamSide]} ${healthPercent}%, transparent ${healthPercent}%)`
          }}
        />
      )}
    </div>
  )
}
