import { Board } from '../models/Board'
import { Box } from '../models/Box'
import { Position } from '../models/Position'
import { Square } from '../models/Square'

export const boards: { [key: string]: Board } = {
  bind: new Board(
    ['#bfa594cc', '#826b59cc'],
    [
      [
        new Square({
          boxes: [new Box({ position: new Position(0, 0) })],
          position: new Position(0, 0)
        }),
        new Square({
          boxes: [new Box({ position: new Position(1, 0) })],
          position: new Position(1, 0)
        }),
        new Square({
          boxes: [new Box({ position: new Position(2, 0) })],
          position: new Position(2, 0)
        }),
        new Square({
          boxes: [new Box({ position: new Position(3, 0) })],
          position: new Position(3, 0)
        }),
        new Square({
          boxes: [new Box({ position: new Position(4, 0) })],
          position: new Position(4, 0)
        }),
        new Square({
          boxes: [new Box({ position: new Position(5, 0) })],
          position: new Position(5, 0)
        }),
        new Square({
          boxes: [new Box({ position: new Position(6, 0) })],
          position: new Position(6, 0)
        })
      ],
      [
        new Square({
          boxes: [new Box({ position: new Position(0, 1) })],
          position: new Position(0, 1)
        }),
        new Square({
          boxes: [new Box({ position: new Position(1, 1) })],
          position: new Position(1, 1)
        }),
        new Square({
          boxes: [
            new Box({ position: new Position(2, 1), type: 'box', free: false })
          ],
          position: new Position(2, 1)
        }),
        new Square({
          boxes: [new Box({ position: new Position(3, 1) })],
          position: new Position(3, 1)
        }),
        new Square({
          boxes: [new Box({ position: new Position(4, 1) })],
          position: new Position(4, 1)
        }),
        new Square({
          boxes: [new Box({ position: new Position(5, 1) })],
          position: new Position(5, 1)
        }),
        new Square({
          boxes: [new Box({ position: new Position(6, 1) })],
          position: new Position(6, 1)
        })
      ],
      [
        new Square({
          boxes: [new Box({ position: new Position(0, 2) })],
          position: new Position(0, 2)
        }),
        new Square({
          boxes: [new Box({ position: new Position(1, 2) })],
          position: new Position(1, 2)
        }),
        new Square({
          boxes: [new Box({ position: new Position(2, 2) })],
          position: new Position(2, 2)
        }),
        new Square({
          boxes: [new Box({ position: new Position(3, 2) })],
          position: new Position(3, 2)
        }),
        new Square({
          boxes: [new Box({ position: new Position(4, 2) })],
          position: new Position(4, 2)
        }),
        new Square({
          boxes: [new Box({ position: new Position(5, 2) })],
          position: new Position(5, 2)
        }),
        new Square({
          boxes: [new Box({ position: new Position(6, 2) })],
          position: new Position(6, 2)
        })
      ],
      [
        new Square({
          boxes: [new Box({ position: new Position(0, 3) })],
          position: new Position(0, 3)
        }),
        new Square({
          boxes: [new Box({ position: new Position(1, 3) })],
          position: new Position(1, 3)
        }),
        new Square({
          boxes: [new Box({ position: new Position(2, 3) })],
          position: new Position(2, 3)
        }),
        new Square({
          boxes: [new Box({ position: new Position(3, 3) })],
          position: new Position(3, 3)
        }),
        new Square({
          boxes: [
            new Box({ position: new Position(4, 3), type: 'box', free: false })
          ],
          position: new Position(4, 3)
        }),
        new Square({
          boxes: [new Box({ position: new Position(5, 3) })],
          position: new Position(5, 3)
        }),
        new Square({
          boxes: [new Box({ position: new Position(6, 3) })],
          position: new Position(6, 3)
        })
      ],
      [
        new Square({
          boxes: [new Box({ position: new Position(0, 4) })],
          position: new Position(0, 4)
        }),
        new Square({
          boxes: [new Box({ position: new Position(1, 4) })],
          position: new Position(1, 4)
        }),
        new Square({
          boxes: [new Box({ position: new Position(2, 4) })],
          position: new Position(2, 4)
        }),
        new Square({
          boxes: [new Box({ position: new Position(3, 4) })],
          position: new Position(3, 4)
        }),
        new Square({
          boxes: [new Box({ position: new Position(4, 4) })],
          position: new Position(4, 4)
        }),
        new Square({
          boxes: [new Box({ position: new Position(5, 4) })],
          position: new Position(5, 4)
        }),
        new Square({
          boxes: [new Box({ position: new Position(6, 4) })],
          position: new Position(6, 4)
        })
      ]
    ]
  )
}
