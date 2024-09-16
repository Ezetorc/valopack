import { Team } from "../types/Team";
import Agent from "./Agent";
import Attributes from "./Attributes";
import Box from "./Box";

export default interface BoxWithAgent extends Box {
  agent: Agent & Attributes;
  team: Team;
}
