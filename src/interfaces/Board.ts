import { BoardGrid } from '../types/BoardGrid'

export default interface Board {
  color: [`#${string}`, `#${string}`]
  grid: BoardGrid
}
