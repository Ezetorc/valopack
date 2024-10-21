import { BoxType } from '../types/BoxType'
import { Hexadecimal } from '../types/Hexadecimal'
import Box from './Box'
import Position from './Position'

export default class Square {
  public boxes: Box[]
  public position: Position

  constructor ({
    position = new Position(0, 0),
    boxes = []
  }: Partial<Square> = {}) {
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

  add (box: Box): void {
    this.boxes.unshift(box)
  }

  remove (box: Box | BoxType): void {
    if (box instanceof Box) {
      this.boxes = this.boxes.filter(boxInBoxes => boxInBoxes !== box)
    } else {
      this.boxes = this.boxes.filter(boxInBoxes => boxInBoxes.type !== box)
    }
  }

  getColor (colors: Hexadecimal[]): Hexadecimal {
    const { x, y } = this.position
    const isEven: boolean = (x + y) % 2 === 0
    const squareColor: string = isEven ? colors[0] : colors[1]

    return squareColor as Hexadecimal
  }
}
