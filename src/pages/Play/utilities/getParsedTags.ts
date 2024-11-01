import {Tag} from '../models/Tag'
import { Team } from '../../../models/Team'
import {getParsedTeamOption} from './getParsedTeamOption'

export function getParsedTags (tags: Tag[], turn: Team): Tag[] {
  console.log('getParsedTags turn: ', turn)
  return tags.map(tag => ({
    ...tag,
    team: getParsedTeamOption(tag.team, turn)
  }))
}
