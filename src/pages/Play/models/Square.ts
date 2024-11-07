import { BoxType } from './BoxType.ts'
import { Hexadecimal } from '../../../models/Hexadecimal.ts'
import { Box } from './Box.ts'
import { Position } from './Position.ts'

export class Square {
  public boxes: Box[]
  public position: Position
  public style: { [key: string]: string }
  public classes: Set<string>

  constructor ({
    position = new Position(0, 0),
    boxes = [],
    style = {},
    classes = new Set<string>()
  }: Partial<Square> = {}) {
    this.position = position
    this.boxes = boxes
    this.style = style
    this.classes = classes
  }

  getFirstBox (): Box {
    return this.boxes[0]
  }

  hasBox (boxType: BoxType): boolean {
    return this.boxes.some(box => box.type == boxType)
  }

  getBox (boxType: BoxType): Box | undefined {
    return this.boxes.find(box => box.type == boxType)
  }

  isFree (): boolean {
    return this.boxes.every(box => box.free === true)
  }

  addBox (box: Box): void {
    this.boxes.unshift(box)
  }

  addClass (className: string): void {
    this.classes.add(className)
  }

  removeClass (className: string): void {
    this.classes.delete(className)
  }

  addStyleProperty (propertyName: string, propertyValue: string): void {
    this.style[propertyName] = propertyValue
  }

  removeStyleProperty (propertyName: string): void {
    delete this.style[propertyName]
  }

  removeBox (box: Box | BoxType): void {
    if (box instanceof Box) {
      this.boxes = this.boxes.filter(boxInBoxes => boxInBoxes !== box)
    } else {
      this.boxes = this.boxes.filter(boxInBoxes => boxInBoxes.type !== box)
    }
  }

  getBoxesTypes (): BoxType[] {
    return this.boxes.map(box => box.type)
  }

  getColor (colors: Hexadecimal[]): Hexadecimal {
    const { x, y } = this.position
    const isEven: boolean = (x + y) % 2 === 0
    const squareColor: string = isEven ? colors[0] : colors[1]

    return squareColor as Hexadecimal
  }
}
