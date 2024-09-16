import { Role } from "../types/Role";

export default interface Agent {
  name: string;
  id: number;
  portrait: string;
  icon: string;
  level: number;
  role: Role;
}


