import { AbilityIdentifier } from './AbilityIdentifier.ts'
import { EntityType } from './EntityType.ts'
import { Method } from './Method.ts'

export interface Ability {
  readonly identifier: AbilityIdentifier
  readonly validEntityTypes: (EntityType | 'empty')[]
  readonly uses: number
  readonly useRange: [number, number]
  readonly index: 0 | 1
  readonly methods: Method[]
}
