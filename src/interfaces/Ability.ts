import { AbilityIdentifier } from '../types/AbilityIdentifier'
import { BoxType } from '../types/BoxType'
import Method from './Method'

export default interface Ability {
  identifier: AbilityIdentifier
  usesLeft: number
  validBoxTypes: BoxType[]
  useRange: [number, number]
  methods: Method[]
}
