import { BoxType } from '../types/BoxType'
import { Vector2 } from '../types/Vector2'
import Box from './Box'

export default class Square {
  public boxes: Box[]
  public position: Vector2

  constructor ({ position = { x: 0, y: 0 }, boxes = [] }: Partial<Square> = {}) {
    this.position = position
    this.boxes = boxes
  }

  getFirstBox (): Box {
    return this.boxes[0]
  }

  has (boxType: BoxType): boolean {
    return this.boxes.some(box => box.type == boxType)
  }

  get (boxType: BoxType): Box | undefined {
    return this.boxes.find(box => box.type == boxType)
  }

  isFree (): boolean {
    return this.boxes.every(box => box.free === true)
  }
}
