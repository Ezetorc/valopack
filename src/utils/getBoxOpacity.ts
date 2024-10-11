import Box from '../classes/Box'
import Player from '../classes/Player'
import Square from '../classes/Square'
import { Team } from '../types/Team'

export default function getBoxOpacity (square: Square, box: Box): number {
  const smokeInSquare: boolean = square.boxes.some(
    box => box.type == 'skySmoke'
  )
  const isPlayer: boolean = box.type == 'player'
  const playerTeam: Team = (box as Player).team

  if (smokeInSquare && isPlayer && playerTeam == 'ally') {
    return 0.4
  }

  return 1
}
