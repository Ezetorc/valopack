import { AbilityIdentifier } from '../pages/Play/models/AbilityIdentifier.ts'
import { Method } from '../pages/Play/models/Method.ts'
import { ValidEntityTypes } from '../pages/Play/models/ValidEntityTypes.ts'

export interface Ability {
  readonly identifier: AbilityIdentifier
  readonly validEntityTypes: ValidEntityTypes
  readonly uses: number
  readonly useRange: [number, number]
  readonly index: undefined | 0 | 1
  readonly methods: Method[]
}
