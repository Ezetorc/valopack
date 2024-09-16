import Agent from "../interfaces/Agent";
import Box from "../interfaces/Box";


export default function isAgent(box: Box) {
  return (
    typeof box === "object" &&
    "agent" in box &&
    (box as { agent: Agent }).agent.name !== undefined &&
    (box as { agent: Agent }).agent.role !== undefined
  );
}
