import { AbilityIdentifier } from './AbilityIdentifier'
import { BoxType } from './BoxType'
import {Method} from './Method'

export interface Ability {
  identifier: AbilityIdentifier
  usesLeft: number
  validBoxTypes: BoxType[]
  useRange: [number, number]
  methods: Method[]
}
