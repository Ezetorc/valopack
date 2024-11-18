import { EntityType } from './EntityType.ts'
import { Hexadecimal } from '../../../models/Hexadecimal.ts'
import { Entity } from './Entity.ts'
import { Position } from './Position.ts'

export class Square {
  public entities: Entity[]
  public position: Position
  public style: { [key: string]: string }
  public classes: Set<string>

  constructor ({
    position = new Position(0, 0),
    entities = [],
    style = {},
    classes = new Set<string>()
  }: Partial<Square> = {}) {
    this.position = position
    this.entities = entities
    this.style = style
    this.classes = classes
  }

  getFirstEntity (): Entity {
    return this.entities[0]
  }

  hasEntity (entityType: EntityType): boolean {
    return this.entities.some(entity => entity.type == entityType)
  }

  getEntityByType (entityType: EntityType): Entity | undefined {
    return this.entities.find(entiy => entiy.type == entityType)
  }

  isFree (): boolean {
    return this.entities.every(entity => entity.free === true)
  }

  addEntity (entity: Entity): void {
    this.entities.unshift(entity)
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

  removeEntity (entity: Entity | EntityType): void {
    if (entity instanceof Entity) {
      this.entities = this.entities.filter(
        entityInEntities => entityInEntities !== entity
      )
    } else {
      this.entities = this.entities.filter(
        entityInEntities => entityInEntities.type !== entity
      )
    }
  }

  getEntitiesTypes (): EntityType[] {
    return this.entities.map(entity => entity.type)
  }

  getColor (colors: Hexadecimal[]): Hexadecimal {
    const { x, y } = this.position
    const isEven: boolean = (x + y) % 2 === 0
    const squareColor: string = isEven ? colors[0] : colors[1]

    return squareColor as Hexadecimal
  }
}
