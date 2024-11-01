import { Team } from '../../../models/Team'
import { TeamOption } from '../models/TeamOption'

export function getParsedTeamOption (
  teamOption: TeamOption,
  turn: Team
): Team {
  console.log('getParsedTeamOption turn: ', turn)

  if (teamOption == 'opposite-team') {
    return turn == 'ally' ? 'enemy' : 'ally'
  } else if (teamOption == 'current-team') {
    return turn
  } else {
    return teamOption
  }
}
