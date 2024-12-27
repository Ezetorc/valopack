import { Entity } from './Entity'
import { Position } from './Position'

export class StimBeacon extends Entity {
  constructor () {
    super({
      position: new Position(0, 0),
      free: false,
      tags: [],
      onEntityEnter: () => true,
      image: 'src/pages/Play/assets/images/stim_beacon.webp',
      type: 'stimBeacon',
      depth: 20
    })
  }
}
