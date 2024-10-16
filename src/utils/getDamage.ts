import Player from "../classes/Player";

export default function getDamage (attacker: Player, target: Player): number {
  return Math.max(attacker.attributes.attack - target.attributes.defense, 0)
}
