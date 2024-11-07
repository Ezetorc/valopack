import { Player } from '../models/Player.ts'
import { useBoard } from '../hooks/useBoard.ts'
import { useSettings } from '../../../hooks/useSettings.ts'
import { Ability } from '../models/Ability.ts'
import { Action } from './Action.tsx'
import './Actions.css'
import { teamColors } from '../../../valopack.config.ts'

interface ActionsProps {
  onOpenInfo: () => void
}

export function Actions ({ onOpenInfo }: ActionsProps) {
  const { texts } = useSettings()
  const { squareFrom, setAction } = useBoard()
  if (!squareFrom) return
  const { team, agent } = squareFrom?.getFirstBox() as Player
  if (!agent) return
  const borderColor: string = teamColors[team]
  const { icon, name, abilities } = agent
  const [ability0, ability1] = abilities

  const isAvailable = (ability: Ability): boolean => ability.usesLeft > 0

  return (
    <footer className='game__actions'>
      <img style={{ borderColor }} src={icon} alt={name} />

      {team === 'ally' && (
        <>
          <Action usesLeft={-1} onClick={() => setAction('move')}>
            {texts.actions.move}
          </Action>
          <Action usesLeft={-1} onClick={() => setAction('attack')}>
            {texts.actions.attack}
          </Action>

          {ability0 && (
            <Action
              className={`available-${isAvailable(ability0)}`}
              onClick={() => setAction('ability0')}
            >
              {texts.abilities[ability0.identifier].name}
            </Action>
          )}

          {ability1 && (
            <Action
              className={`available-${isAvailable(ability1)}`}
              onClick={() => setAction('ability1')}
            >
              {texts.abilities[ability1.identifier].name}
            </Action>
          )}
        </>
      )}

      <Action className='action info' onClick={onOpenInfo}>
        Info
      </Action>
    </footer>
  )
}
