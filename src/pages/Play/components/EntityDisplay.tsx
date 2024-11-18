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
  const flip: number = isPlayer ? (player?.teamSide == 'ally' ? 1 : -1) : 1
  const teamSide: string = player ? player.teamSide : ''
  const clsxClassName = {
    'bg-[url("src/pages/Play/assets/images/box.webp")]': entity.type === 'box',
    'bg-[url("src/pages/Play/assets/images/stim_beacon.webp")]':
      entity.type === 'stimBeacon',
    'bg-blue-gradient': entity.type === 'skySmoke',
    'border-b-[5px] border-b-v_ally': teamSide === 'ally',
    'border-b-[5px] border-b-v_enemy': teamSide === 'enemy'
  }

  return (
    <div
      className={clsx(
        'w-full aspect-square flex justify-center items-center text-[#ffffff24] border-[5px] border-transparent text-[clamp(30px,_3vw,_40px)] bg-center bg-contain bg-no-repeat absolute bg-transparent',
        clsxClassName
      )}
      style={{ transform: `scaleX(${flip})`, opacity: opacity }}
    >
      {isPlayer && player?.card && (
        <img className='w-full' src={player.card.icon} alt={player.card.name} />
      )}
    </div>
  )
}
