import { Role } from "../types/Role";
import Ability from "./Ability";

export default interface Agent {
  name: string;
  id: number;
  portrait: string;
  icon: string;
  level: number;
  role: Role;
  abilities: Ability[];
}
