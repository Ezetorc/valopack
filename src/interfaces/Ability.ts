import { AbilityIdentifier } from '../types/AbilityIdentifier'
import { BoxType } from '../types/BoxType'
import Method from './Method'

export default interface Ability {
  identifier: AbilityIdentifier
  usesLeft: number
  boxTypes: BoxType[]
  range: [number, number]
  methods: Method[]
}
