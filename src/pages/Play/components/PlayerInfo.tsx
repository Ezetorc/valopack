import { Player } from '../models/Player.ts'
import { useBoard } from '../hooks/useBoard.ts'
import { useSettings } from '../../../hooks/useSettings.ts'
import { Modal } from '../../../components/Modal.tsx'
import { Attribute } from './Attribute.tsx'

interface PlayerInfoProps {
  onClose: () => void
}

export function PlayerInfo ({ onClose }: PlayerInfoProps) {
  const { texts } = useSettings()
  const { squareFrom } = useBoard()
  if (!squareFrom) return
  const player: Player = squareFrom.getEntityByType('player') as Player
  const { name, image } = player.card
  const { teamSide } = player
  const { attack, health, defense, speed, precision, critic, resistance } =
    player.attributes

  return (
    <Modal className='w-[90%] h-[90%] min-w-[400px] grid grid-cols-1 md:grid-cols-2 relative'>
      <article className='flex flex-col relative'>
        <button
          onClick={onClose}
          className='bg-v_red_gradient border-2 border-v_red font-stroke m-2 w-[20%] text-[clamp(20px,_2vw,_60px)] cursor-pointer hover:border-white'
        >
          {texts.close}
        </button>
        <span className='w-full text-center text-[clamp(30px,_6vw,_80px)] px-5 underline'>
          {name}
        </span>
        <span className='w-full text-center text-[clamp(20px,_3vw,_70px)] px-5'>
          {teamSide}
        </span>
        <img src={image} alt={`${name} Image`} className='w-[60%] self-center' />
      </article>

      <article className='grid p-2 overflow-hidden'>
        <Attribute text={texts.attributes.health} value={health} />
        <Attribute text={texts.attributes.attack} value={attack} />
        <Attribute text={texts.attributes.defense} value={defense} />
        <Attribute text={texts.attributes.speed} value={speed} />
        <Attribute text={texts.attributes.precision} value={precision} />
        <Attribute text={texts.attributes.critic} value={critic} />
        <Attribute text={texts.attributes.resistance} value={resistance} />
        <span>{texts.clickToDescriptions}</span>
      </article>
    </Modal>
  )
}
