import { Entity } from './Entity'
import { Player } from './Player'
import { Position } from './Position'

export class Fire extends Entity {
  constructor () {
    super({
      position: new Position(0, 0),
      free: true,
      tags: [],
      image: 'src/pages/Play/assets/images/fire.webp',
      type: 'fire',
      depth: 10
    })

    this.onEntityEnter = (entity: Entity): boolean => {
      if (entity.is('player')) {
        const player: Player = entity as Player
        player.setHealth(prevHealth => prevHealth - 30)
      }

      return true
    }
  }
}
