import Tag from '../interfaces/Tag'
import { Team } from '../types/Team'
import getParsedTeamOption from './getParsedTeamOption'

export default function getParsedTags (tags: Tag[], turn: Team): Tag[] {
  console.log('getParsedTags turn: ', turn)
  return tags.map(tag => ({
    ...tag,
    team: getParsedTeamOption(tag.team, turn)
  }))
}
