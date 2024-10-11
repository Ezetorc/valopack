import Box from '../classes/Box'
import Square from '../classes/Square'
import Board from '../interfaces/Board'

export const boards: { [key: string]: Board } = {
  bind: {
    color: ['#bfa594cc', '#826b59cc'],
    grid: [
      [
        new Square({
          boxes: [new Box({ position: { x: 0, y: 0 } })],
          position: { x: 0, y: 0 }
        }),
        new Square({
          boxes: [new Box({ position: { x: 1, y: 0 } })],
          position: { x: 1, y: 0 }
        }),
        new Square({
          boxes: [new Box({ position: { x: 2, y: 0 } })],
          position: { x: 2, y: 0 }
        }),
        new Square({
          boxes: [new Box({ position: { x: 3, y: 0 } })],
          position: { x: 3, y: 0 }
        }),
        new Square({
          boxes: [new Box({ position: { x: 4, y: 0 } })],
          position: { x: 4, y: 0 }
        }),
        new Square({
          boxes: [new Box({ position: { x: 5, y: 0 } })],
          position: { x: 5, y: 0 }
        }),
        new Square({
          boxes: [new Box({ position: { x: 6, y: 0 } })],
          position: { x: 6, y: 0 }
        })
      ],
      [
        new Square({
          boxes: [new Box({ position: { x: 0, y: 1 } })],
          position: { x: 0, y: 1 }
        }),
        new Square({
          boxes: [new Box({ position: { x: 1, y: 1 } })],
          position: { x: 1, y: 1 }
        }),
        new Square({
          boxes: [
            new Box({ position: { x: 2, y: 1 }, type: 'box', free: false })
          ],
          position: { x: 2, y: 1 }
        }),
        new Square({
          boxes: [new Box({ position: { x: 3, y: 1 } })],
          position: { x: 3, y: 1 }
        }),
        new Square({
          boxes: [new Box({ position: { x: 4, y: 1 } })],
          position: { x: 4, y: 1 }
        }),
        new Square({
          boxes: [new Box({ position: { x: 5, y: 1 } })],
          position: { x: 5, y: 1 }
        }),
        new Square({
          boxes: [new Box({ position: { x: 6, y: 1 } })],
          position: { x: 6, y: 1 }
        })
      ],
      [
        new Square({
          boxes: [new Box({ position: { x: 0, y: 2 } })],
          position: { x: 0, y: 2 }
        }),
        new Square({
          boxes: [new Box({ position: { x: 1, y: 2 } })],
          position: { x: 1, y: 2 }
        }),
        new Square({
          boxes: [new Box({ position: { x: 2, y: 2 } })],
          position: { x: 2, y: 2 }
        }),
        new Square({
          boxes: [new Box({ position: { x: 3, y: 2 } })],
          position: { x: 3, y: 2 }
        }),
        new Square({
          boxes: [new Box({ position: { x: 4, y: 2 } })],
          position: { x: 4, y: 2 }
        }),
        new Square({
          boxes: [new Box({ position: { x: 5, y: 2 } })],
          position: { x: 5, y: 2 }
        }),
        new Square({
          boxes: [new Box({ position: { x: 6, y: 2 } })],
          position: { x: 6, y: 2 }
        })
      ],
      [
        new Square({
          boxes: [new Box({ position: { x: 0, y: 3 } })],
          position: { x: 0, y: 3 }
        }),
        new Square({
          boxes: [new Box({ position: { x: 1, y: 3 } })],
          position: { x: 1, y: 3 }
        }),
        new Square({
          boxes: [new Box({ position: { x: 2, y: 3 } })],
          position: { x: 2, y: 3 }
        }),
        new Square({
          boxes: [new Box({ position: { x: 3, y: 3 } })],
          position: { x: 3, y: 3 }
        }),
        new Square({
          boxes: [
            new Box({ position: { x: 4, y: 3 }, type: 'box', free: false })
          ],
          position: { x: 4, y: 3 }
        }),
        new Square({
          boxes: [new Box({ position: { x: 5, y: 3 } })],
          position: { x: 5, y: 3 }
        }),
        new Square({
          boxes: [new Box({ position: { x: 6, y: 3 } })],
          position: { x: 6, y: 3 }
        })
      ],
      [
        new Square({
          boxes: [new Box({ position: { x: 0, y: 4 } })],
          position: { x: 0, y: 4 }
        }),
        new Square({
          boxes: [new Box({ position: { x: 1, y: 4 } })],
          position: { x: 1, y: 4 }
        }),
        new Square({
          boxes: [new Box({ position: { x: 2, y: 4 } })],
          position: { x: 2, y: 4 }
        }),
        new Square({
          boxes: [new Box({ position: { x: 3, y: 4 } })],
          position: { x: 3, y: 4 }
        }),
        new Square({
          boxes: [new Box({ position: { x: 4, y: 4 } })],
          position: { x: 4, y: 4 }
        }),
        new Square({
          boxes: [new Box({ position: { x: 5, y: 4 } })],
          position: { x: 5, y: 4 }
        }),
        new Square({
          boxes: [new Box({ position: { x: 6, y: 4 } })],
          position: { x: 6, y: 4 }
        })
      ]
    ]
  }
}
