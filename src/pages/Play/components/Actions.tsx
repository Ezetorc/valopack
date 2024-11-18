import { Player } from '../models/Player.ts'
import { useBoard } from '../hooks/useBoard.ts'
import { useSettings } from '../../../hooks/useSettings.ts'
import { Ability } from '../models/Ability.ts'
import { Action } from './Action.tsx'
import { teamColors } from '../../../valopack.config.ts'

interface ActionsProps {
  onOpenInfo: () => void
}

export function Actions ({ onOpenInfo }: ActionsProps) {
  const { texts } = useSettings()
  const { squareFrom, setAction } = useBoard()
  if (!squareFrom) return
  const { teamSide, card } = squareFrom?.getFirstEntity() as Player
  if (!card) return
  const borderColor: string = teamColors[teamSide]
  const { icon, name, abilities } = card
  const [ability0, ability1] = abilities

  const isAvailable = (ability: Ability): boolean => ability.usesLeft > 0

  return (
    <footer className='flex bg-[#7979a8] w-[90%] aspect-[16/2] overflow-hidden items-center animate-appear gap-[3%] [padding-inline:2%]'>
      <img
        style={{ borderColor }}
        src={icon}
        alt={name}
        className='w-full max-w-[150px] border-b-[10px] border-b-transparent'
      />

      {teamSide === 'ally' && (
        <>
          <Action
            usesLeft={-1}
            onClick={() => setAction('move')}
            className='border-v_red bg-v_red_gradient'
          >
            {texts.actions.move}
          </Action>
          <Action
            usesLeft={-1}
            onClick={() => setAction('attack')}
            className='border-v_red bg-v_red_gradient'
          >
            {texts.actions.attack}
          </Action>

          {ability0 && (
            <Action
              className={`available-${isAvailable(ability0)} border-v_red bg-v_red_gradient`}
              onClick={() => setAction('ability0')}
            >
              {texts.abilities[ability0.identifier].name}
            </Action>
          )}

          {ability1 && (
            <Action
              className={`available-${isAvailable(ability1)} border-v_red bg-v_red_gradient`}
              onClick={() => setAction('ability1')}
            >
              {texts.abilities[ability1.identifier].name}
            </Action>
          )}
        </>
      )}

      <Action
        className='grow-[1] bg-v_aqua_gradient border-v_aqua hover:border-white'
        onClick={onOpenInfo}
      >
        Info
      </Action>
    </footer>
  )
}
