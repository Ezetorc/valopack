import Map from "../interfaces/Map";

export const maps: { [key: string]: Map } = {
  bind: {
    color: ["#bfa594cc", "#826b59cc"],
    grid: [
      [
        { type: "empty", position: { x: 0, y: 0 }, codes: [], free: true },
        { type: "empty", position: { x: 1, y: 0 }, codes: [], free: true },
        { type: "empty", position: { x: 2, y: 0 }, codes: [], free: true },
        { type: "empty", position: { x: 3, y: 0 }, codes: [], free: true },
        { type: "empty", position: { x: 4, y: 0 }, codes: [], free: true },
        { type: "empty", position: { x: 5, y: 0 }, codes: [], free: true },
        { type: "empty", position: { x: 6, y: 0 }, codes: [], free: true },
      ],
      [
        { type: "empty", position: { x: 0, y: 1 }, codes: [], free: true },
        { type: "empty", position: { x: 1, y: 1 }, codes: [], free: true },
        { type: "box", position: { x: 2, y: 1 }, codes: [], free: false },
        { type: "empty", position: { x: 3, y: 1 }, codes: [], free: true },
        { type: "empty", position: { x: 4, y: 1 }, codes: [], free: true },
        { type: "empty", position: { x: 5, y: 1 }, codes: [], free: true },
        { type: "empty", position: { x: 6, y: 1 }, codes: [], free: true },
      ],
      [
        { type: "empty", position: { x: 0, y: 2 }, codes: [], free: true },
        { type: "empty", position: { x: 1, y: 2 }, codes: [], free: true },
        { type: "empty", position: { x: 2, y: 2 }, codes: [], free: true },
        { type: "empty", position: { x: 3, y: 2 }, codes: [], free: true },
        { type: "empty", position: { x: 4, y: 2 }, codes: [], free: true },
        { type: "empty", position: { x: 5, y: 2 }, codes: [], free: true },
        { type: "empty", position: { x: 6, y: 2 }, codes: [], free: true },
      ],
      [
        { type: "empty", position: { x: 0, y: 3 }, codes: [], free: true },
        { type: "empty", position: { x: 1, y: 3 }, codes: [], free: true },
        { type: "empty", position: { x: 2, y: 3 }, codes: [], free: true },
        { type: "empty", position: { x: 3, y: 3 }, codes: [], free: true },
        { type: "box", position: { x: 4, y: 3 }, codes: [], free: false },
        { type: "empty", position: { x: 5, y: 3 }, codes: [], free: true },
        { type: "empty", position: { x: 6, y: 3 }, codes: [], free: true },
      ],
      [
        { type: "empty", position: { x: 0, y: 4 }, codes: [], free: true },
        { type: "empty", position: { x: 1, y: 4 }, codes: [], free: true },
        { type: "empty", position: { x: 2, y: 4 }, codes: [], free: true },
        { type: "empty", position: { x: 3, y: 4 }, codes: [], free: true },
        { type: "empty", position: { x: 4, y: 4 }, codes: [], free: true },
        { type: "empty", position: { x: 5, y: 4 }, codes: [], free: true },
        { type: "empty", position: { x: 6, y: 4 }, codes: [], free: true },
      ],
    ],
  },
};
