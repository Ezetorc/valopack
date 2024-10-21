import Square from '../classes/Square'
import Method from './Method'

export default interface Effect {
  turnsLeft: number
  methods: Method[]
  square: Square
}
