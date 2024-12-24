import { EntityType } from './EntityType.ts'
import { Hexadecimal } from '../../../models/Hexadecimal.ts'
import { Entity } from './Entity.ts'
import { Position } from './Position.ts'
import { Player } from './Player.ts'
import { Tag } from './Tag.ts'

export class Square {
  public entities: Entity[]
  public position: Position
  public classes: Set<string>
  public style: { [key: string]: string }

  constructor ({
    position = new Position(0, 0),
    entities = [],
    style = {},
    classes = new Set<string>()
  }: Partial<Square> = {}) {
    this.position = position
    this.entities = entities
    this.classes = classes
    this.style = style
  }

  getFirstEntity (): Entity {
    return this.entities[0]
  }

  hasEntityWithType (entityType: EntityType): boolean {
    return this.entities.some(entity => entity.type == entityType)
  }

  hasEntityWithTag (tags: Tag[]): boolean {
    return this.entities.some(entity =>
      tags.some(tag => {
        return entity.tags.some(
          entityTag =>
            entityTag.text === tag.text && entityTag.team === tag.team
        )
      })
    )
  }

  isEmpty (): boolean {
    return this.entities.length === 0
  }

  getEntityByType (entityType: EntityType): Entity | undefined {
    return this.entities.find(entiy => entiy.type == entityType)
  }

  getPlayer (): Player | undefined {
    const result: Entity | undefined = this.entities.find(
      entity => entity.type === 'player'
    )

    if (result) {
      return result as Player
    }
  }

  getEntitiesByType (entityType: EntityType): Entity[] {
    return this.entities.filter(entity => entity.type === entityType)
  }

  isFree (): boolean {
    return this.entities.every(entity => entity.free === true)
  }

  addEntity (entity: Entity, position?: 'backward' | 'forward'): void {
    if (position === 'forward') {
      this.entities.push(entity)
    } else {
      this.entities.unshift(entity)
    }
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

  getEntitiesTypes (): EntityType[] | 'empty' {
    return this.isEmpty() ? 'empty' : this.entities.map(entity => entity.type)
  }

  getColor (colors: Hexadecimal[]): Hexadecimal {
    const { x, y } = this.position
    const isEven: boolean = (x + y) % 2 === 0
    const squareColor: string = isEven ? colors[0] : colors[1]

    return squareColor as Hexadecimal
  }
}
