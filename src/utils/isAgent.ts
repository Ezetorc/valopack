import Agent from "../interfaces/Agent";
import Box from "../interfaces/Box";

export default function isAgent(box: Box) {
  return (
    typeof box === "object" &&
    "player" in box &&
    (box as { player: Agent }).player.name !== undefined &&
    (box as { player: Agent }).player.role !== undefined
  );
}
