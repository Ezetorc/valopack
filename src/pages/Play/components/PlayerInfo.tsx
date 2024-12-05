import { Player } from '../models/Player.ts'
import { useBoard } from '../hooks/useBoard.ts'
import { useSettings } from '../../../hooks/useSettings.ts'
import { Modal } from '../../../components/Modal.tsx'
import { Attribute } from './Attribute.tsx'
import { ToggleSlider } from 'react-toggle-slider'
import { CloseButton } from '../../../components/CloseButton.tsx'
import { EntityDisplay } from './EntityDisplay.tsx'
import { useState } from 'react'
import { AbilityDisplay } from './AbilityDisplay.tsx'
import { Square } from '../models/Square.ts'

interface PlayerInfoProps {
  onClose: () => void
}

export function PlayerInfo ({ onClose }: PlayerInfoProps) {
  const { texts } = useSettings()
  const { getSquareFrom } = useBoard()
  const squareFrom: Square | null = getSquareFrom()
  const [infoSection, setInfoSection] = useState<'attributes' | 'abilities'>(
    'attributes'
  )

  if (!squareFrom) return

  const player: Player = squareFrom.getEntityByType('player') as Player
  const { name, attributes } = player
  const { attack, health, defense, speed, precision, critic, resistance } =
    attributes

  const handleToggleInfoSection = (state: boolean): void => {
    if (state) {
      setInfoSection('abilities')
    } else {
      setInfoSection('attributes')
    }
  }

  return (
    <Modal className='w-[clamp(315px,80vw,1000px)] h-[90vh] grid grid-cols-[1fr,1fr]'>
      <div className='w-full h-full'>
        <header className='w-full h-[20%] grid grid-cols-2'>
          <CloseButton onClose={onClose} className='h-[50%] ml-[5%] mt-[5%]' />
        </header>

        <main className='w-full h-[80%] flex justify-center items-center flex-col'>
          <div className='w-[40%] aspect-square relative'>
            <EntityDisplay entity={player} opacity={1} />
          </div>

          <span className='text-[clamp(30px,5vw,80px)]'>{name}</span>
        </main>
      </div>

      <div className='w-full h-full'>
        <header className='w-full h-[10%] flex justify-center items-center'>
          <ToggleSlider onToggle={handleToggleInfoSection} />
        </header>

        <main className='w-full h-[90%] flex flex-col items-center justify-center p-[3%]'>
          {infoSection == 'attributes' ? (
            <>
              <Attribute text={texts.attributes.health} value={health} />
              <Attribute text={texts.attributes.attack} value={attack} />
              <Attribute text={texts.attributes.defense} value={defense} />
              <Attribute text={texts.attributes.speed} value={speed} />
              <Attribute text={texts.attributes.precision} value={precision} />
              <Attribute text={texts.attributes.critic} value={critic} />
              <Attribute
                text={texts.attributes.resistance}
                value={resistance}
              />
            </>
          ) : (
            <>
              {player.abilities.map((ability, index) => (
                <AbilityDisplay ability={ability} key={index} />
              ))}
            </>
          )}
        </main>
      </div>
    </Modal>
  )
}
