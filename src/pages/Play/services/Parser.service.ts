import { Attributes } from '../../../models/Attributes.ts'
import { Hexadecimal } from '../../../models/Hexadecimal.ts'
import { TeamSide } from '../../../models/TeamSide.ts'
import { maxLeveledAttributes, teamColors } from '../../../valopack.config.ts'
import { Ability } from '../models/Ability.ts'
import { GetParams } from '../models/GetParams.ts'
import { Method } from '../models/Method.ts'
import { Tag } from '../models/Tag.ts'
import { TeamOption } from '../models/TeamOption.ts'

export class Parser {
  static getTeamSide (teamOption: TeamOption, turn: TeamSide): TeamSide {
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
      team: this.getTeamSide(tag.team, turn)
    }))
  }

  static getParsedAbilities (abilities: Ability[]): Ability[] {
    return [
      { ...abilities[0], index: 0 },
      { ...abilities[1], index: 1 }
    ]
  }

  static getParsedColor (
    color: Hexadecimal | 'current-team-color' | 'opposite-team-color',
    turn: TeamSide
  ): Hexadecimal {
    if (color == 'current-team-color') {
      return teamColors[turn] as Hexadecimal
    } else {
      return (turn == 'ally' ? teamColors['enemy']  : teamColors['ally']) as Hexadecimal
    }
  }

  static getParsedAttributes (
    attributes: Attributes,
    level: number
  ): Attributes {
    return Object.keys(attributes).reduce((acc, key) => {
      const attributeKey: keyof Attributes = key as keyof Attributes
      const newValue: number = attributes[attributeKey] + (level - 1) * 25

      if (newValue > maxLeveledAttributes[attributeKey]) {
        acc[attributeKey] = maxLeveledAttributes[attributeKey]
      } else {
        acc[attributeKey] = newValue
      }

      return acc
    }, {} as Attributes)
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

      if (getParams.filters?.teamSide) {
        getParams.filters.teamSide = Parser.getTeamSide(
          getParams.filters.teamSide,
          turn
        )
      }
    }

    return method
  }
}
