import { Team } from "../types/Team";
import Agent from "./Agent";
import Attributes from "./Attributes";
import Box from "./Box";

export default interface Player extends Box {
  agent: Agent;
  attributes: Attributes;
  team: Team;
}
