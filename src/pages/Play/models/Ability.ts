import { AbilityIdentifier } from './AbilityIdentifier.ts'
import { EntityType } from './EntityType.ts'
import { Method } from './Method.ts'

export interface Ability {
  identifier: AbilityIdentifier
  usesLeft: number
  validEntityTypes: EntityType[]
  useRange: [number, number]
  methods: Method[]
}
