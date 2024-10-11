import { BoxType } from '../types/BoxType'
import { Vector2 } from '../types/Vector2'

export default class Box {
  public free: boolean
  public tags: string[]
  public type: BoxType
  public position: Vector2

  constructor ({
    position = { x: 0, y: 0 },
    free = true,
    tags = [],
    type = 'empty'
  }: Partial<Box> = {}) {
    this.position = position
    this.free = free
    this.tags = tags
    this.type = type
  }
}
