import { Role } from "../types/Role";

export default function isRole(foo: string): foo is Role {
  return ["controller", "duelist", "sentinel", "initiator"].includes(foo);
}
