import { TeamSide } from '../../../models/TeamSide.ts'
import { GetParams } from '../models/GetParams.ts'
import { Method } from '../models/Method.ts'
import { Tag } from '../models/Tag.ts'
import { TeamOption } from '../models/TeamOption.ts'

export class Parser {
  static getParsedTeamOption (teamOption: TeamOption, turn: TeamSide) {
    if (teamOption == 'opposite-team') {
      return turn == 'ally' ? 'enemy' : 'ally'
    } else if (teamOption == 'current-team') {
      return turn
    } else {
      return teamOption
    }
  }

  static getParsedTags (tags: Tag[], turn: TeamSide): Tag[] {
    return tags.map(tag => ({
      ...tag,
      team: this.getParsedTeamOption(tag.team, turn)
    }))
  }

  static getParsedMethod (method: Method, turn: TeamSide): Method {
    const { type, params } = method

    if (type == 'add-tag' || type == 'remove-tag') {
      if ('tags' in params) {
        params['tags'] = Parser.getParsedTags(params['tags'], turn)
      }
    }

    if ('get' in params) {
      const getParams: GetParams = params['get']

      if (getParams.tags) {
        getParams.tags = Parser.getParsedTags(getParams.tags, turn)
      }

      if (getParams.filters?.tags) {
        getParams.filters.tags = Parser.getParsedTags(
          getParams.filters.tags,
          turn
        )
      }

      if (getParams.filters?.team) {
        getParams.filters.team = Parser.getParsedTeamOption(
          getParams.filters.team,
          turn
        )
      }
    }

    return method
  }
}
