import { Entity } from '../models/Entity'
import { Box } from '../models/Box'
import { EntityType } from '../models/EntityType'
import { Player } from '../models/Player'
import { StimBeacon } from '../models/StimBeacon'
import { SkySmoke } from '../models/skySmoke'

export const entities: { [key in EntityType]: typeof Entity } = {
  box: Box,
  player: Player,
  skySmoke: SkySmoke,
  stimBeacon: StimBeacon
}
