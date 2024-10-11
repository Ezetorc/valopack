import Player from '../classes/Player'
import Square from '../classes/Square'
import { allyPositions, enemyPositions } from '../constants/general'
import Agent from '../interfaces/Agent'
import Board from '../interfaces/Board'
import { Team } from '../types/Team'
import { Vector2 } from '../types/Vector2'
import getBoardCopy from './getBoardCopy'

export default function initializeBoard (
  board: Board,
  allyTeam: Agent[],
  enemyTeam: Agent[]
): Board {
  const newBoard: Board = getBoardCopy(board)

  const placeAgentsOnBoard = (
    agents: Agent[],
    positions: Vector2[],
    team: Team
  ) => {
    positions.forEach((position, index) => {
      const agent: Agent = agents[index]
      const square: Square = newBoard.grid[position.y][position.x]

      const newPlayer = new Player({
        agent: { ...agent },
        team: team,
        position: position
      })

      square.boxes = [newPlayer]
    })
  }

  placeAgentsOnBoard(allyTeam, allyPositions, 'ally')
  placeAgentsOnBoard(enemyTeam, enemyPositions, 'enemy')

  return newBoard
}
