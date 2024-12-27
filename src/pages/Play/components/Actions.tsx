import { Player } from '../models/Player.ts'
import { useBoard } from '../hooks/useBoard.ts'
import { useSettings } from '../../../hooks/useSettings.ts'
import { ActionDisplay } from './ActionDisplay.tsx'
import { teamColors } from '../../../valopack.config.ts'
import { Action } from '../models/Action.ts'
import { Ability } from '../models/Ability.ts'

interface ActionsProps {
  onOpenInfo: () => void
}

export function Actions ({ onOpenInfo }: ActionsProps) {
  const { texts } = useSettings()
  const { squareFrom, setAction } = useBoard()

  if (!squareFrom) return

  const player: Player = squareFrom.getPlayer() as Player

  if (!player) return

  const borderColor: string = teamColors[player.teamSide]

  const renderAbility = (index: number) => {
    if (!player.abilities) return
    
    const ability: Ability = player.abilities[index]

    if (!ability || !ability.identifier) return

    const abilityUses: number = player.abilityUses[index]
    const isAvailable: boolean = abilityUses > 0
    const actionType: string = `ability${index}`

    return (
      <ActionDisplay
        usesLeft={abilityUses}
        className={`${
          isAvailable
            ? 'border-v_red bg-v_red_gradient'
            : 'border-v_gray bg-v_gray_gradient'
        }`}
        onClick={() => isAvailable && setAction(actionType as Action)}
      >
        {texts.abilities[ability.identifier].name}
      </ActionDisplay>
    )
  }

  return (
    <footer className='flex bg-[#7979a8] w-[clamp(320px,90%,1500px)] aspect-[16/2] overflow-hidden items-center animate-appear gap-[3%] [padding-inline:2%]'>
      <img
        style={{ borderColor }}
        src={player.image}
        alt={player.name}
        className='w-full max-w-[150px] border-b-[10px] border-b-transparent'
      />

      {
        <>
          <ActionDisplay
            onClick={() => setAction('move')}
            className='border-v_red bg-v_red_gradient'
          >
            {texts.actions.move}
          </ActionDisplay>

          <ActionDisplay
            onClick={() => setAction('attack')}
            className='border-v_red bg-v_red_gradient'
          >
            {texts.actions.attack}
          </ActionDisplay>

          {renderAbility(0)}
          {renderAbility(1)}
        </>
      }

      <ActionDisplay
        className='grow-[1] bg-v_aqua_gradient border-v_aqua hover:border-white'
        onClick={onOpenInfo}
      >
        Info
      </ActionDisplay>
    </footer>
  )
}
