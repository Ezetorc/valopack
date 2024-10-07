import { defaultAttributes } from "./../constants/defaultAttributes";
import Agent from "../interfaces/Agent";
import Box from "./Box";
import { Team } from "../types/Team";
import Attributes from "../interfaces/Attributes";
import { Vector2 } from "../types/Vector2";

export default class Player extends Box {
  public agent: Agent;
  public attributes: Attributes;
  public team: Team;
  public position: Vector2;

  constructor({
    agent,
    team = "ally",
    attributes = defaultAttributes,
    position = { x: 0, y: 0 },
  }: Partial<Omit<Player, "agent">> & { agent: Agent }) {
    super();
    this.agent = agent;
    this.attributes = attributes;
    this.team = team;
    this.type = "player";
    this.free = false;
    this.position = position;
  }
}
