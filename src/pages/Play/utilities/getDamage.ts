import {Player} from "../models/Player.ts";

export function getDamage (attacker: Player, target: Player): number {
  return Math.max(attacker.attributes.attack - target.attributes.defense, 0)
}
