import { Entity } from './Entity'
import { Position } from './Position'

export class Box extends Entity {
  constructor ({ position = new Position(0, 0) }: { position: Position }) {
    super({
      position: position,
      free: false,
      tags: [],
      onEntityEnter: () => true,
      image: 'src/pages/Play/assets/images/box.webp',
      type: 'box',
      depth: 30
    })
  }
}
