import { Entity } from '../models/Entity'
import { Box } from '../models/Box'
import { EntityType } from '../models/EntityType'
import { Player } from '../models/Player'
import { StimBeacon } from '../models/StimBeacon'
import { Fire } from '../models/Fire'
import { SkySmoke } from '../models/SkySmoke'

export const entities: { [key in EntityType]: new (...args: never) => Entity } =
  {
    box: Box,
    player: Player,
    skySmoke: SkySmoke,
    stimBeacon: StimBeacon,
    fire: Fire
  }
