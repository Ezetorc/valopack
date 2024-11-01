import {Square} from './Square'
import {Method} from './Method'

export interface Effect {
  turnsLeft: number
  methods: Method[]
  square: Square
}
