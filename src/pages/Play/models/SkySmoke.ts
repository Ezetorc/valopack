import { TeamSide } from '../../../models/TeamSide'
import { Entity } from './Entity'
import { Position } from './Position'

export class SkySmoke extends Entity {
  public teamSide: TeamSide

  constructor ({ teamSide }: { teamSide: TeamSide }) {
    super({
      position: new Position(0, 0),
      free: true,
      tags: [],
      onEntityEnter: () => true,
      image: 'src/pages/Play/assets/images/sky_smoke.webp',
      type: 'skySmoke'
    })

    this.teamSide = teamSide

    this.onEntityEnter = (entity: Entity): boolean => {
      if ('teamSide' in entity) {
        return entity.teamSide !== this.teamSide
      }

      return true
    }
  }
}
