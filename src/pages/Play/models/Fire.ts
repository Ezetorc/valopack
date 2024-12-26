import { Entity } from './Entity'
import { Position } from './Position'

export class Fire extends Entity {
  constructor () {
    super({
      position: new Position(0, 0),
      free: true,
      tags: [],
      onEntityEnter: () => true,
      image: 'src/pages/Play/assets/images/fire.webp',
      type: 'fire'
    })

    this.onEntityEnter = (entity: Entity): boolean => {
      console.log('entity', entity)
      return true
    }
  }
}
