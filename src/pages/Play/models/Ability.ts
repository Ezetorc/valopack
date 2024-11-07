import { AbilityIdentifier } from './AbilityIdentifier.ts'
import { BoxType } from './BoxType.ts'
import { Method } from './Method.ts'

export interface Ability {
  identifier: AbilityIdentifier
  usesLeft: number
  validBoxTypes: BoxType[]
  useRange: [number, number]
  methods: Method[]
}
