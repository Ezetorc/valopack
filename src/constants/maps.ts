import Map from "../interfaces/Map";

export const maps: { [key: string]: Map } = {
  bind: {
    color: ["#bfa594cc", "#826b59cc"],
    grid: [
      [
        { type: "empty", position: { x: 0, y: 0 } },
        { type: "empty", position: { x: 1, y: 0 } },
        { type: "empty", position: { x: 2, y: 0 } },
        { type: "empty", position: { x: 3, y: 0 } },
        { type: "empty", position: { x: 4, y: 0 } },
        { type: "empty", position: { x: 5, y: 0 } },
        { type: "empty", position: { x: 6, y: 0 } },
      ],
      [
        { type: "empty", position: { x: 0, y: 1 } },
        { type: "empty", position: { x: 1, y: 1 } },
        { type: "collision", position: { x: 2, y: 1 } },
        { type: "empty", position: { x: 3, y: 1 } },
        { type: "empty", position: { x: 4, y: 1 } },
        { type: "empty", position: { x: 5, y: 1 } },
        { type: "empty", position: { x: 6, y: 1 } },
      ],
      [
        { type: "empty", position: { x: 0, y: 2 } },
        { type: "empty", position: { x: 1, y: 2 } },
        { type: "empty", position: { x: 2, y: 2 } },
        { type: "empty", position: { x: 3, y: 2 } },
        { type: "empty", position: { x: 4, y: 2 } },
        { type: "empty", position: { x: 5, y: 2 } },
        { type: "empty", position: { x: 6, y: 2 } },
      ],
      [
        { type: "empty", position: { x: 0, y: 3 } },
        { type: "empty", position: { x: 1, y: 3 } },
        { type: "empty", position: { x: 2, y: 3 } },
        { type: "empty", position: { x: 3, y: 3 } },
        { type: "collision", position: { x: 4, y: 3 } },
        { type: "empty", position: { x: 5, y: 3 } },
        { type: "empty", position: { x: 6, y: 3 } },
      ],
      [
        { type: "empty", position: { x: 0, y: 4 } },
        { type: "empty", position: { x: 1, y: 4 } },
        { type: "empty", position: { x: 2, y: 4 } },
        { type: "empty", position: { x: 3, y: 4 } },
        { type: "empty", position: { x: 4, y: 4 } },
        { type: "empty", position: { x: 5, y: 4 } },
        { type: "empty", position: { x: 6, y: 4 } },
      ],
    ],
  },
};
