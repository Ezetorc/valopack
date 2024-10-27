import { Team } from '../types/Team'
import { TeamOption } from '../types/TeamOption'

export default function getParsedTeamOption (
  teamOption: TeamOption,
  turn: Team
): Team {
  if (teamOption == 'oppositeTeam') {
    return turn == 'ally' ? 'enemy' : 'ally'
  } else if (teamOption == 'currentTeam') {
    return turn
  } else {
    return teamOption
  }
}
