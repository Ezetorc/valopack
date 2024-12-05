import { Method } from './Method'
import { Square } from './Square'

export interface PendingAction {
  turns: number
  squareTo: Square
  methods: Method[]
}
