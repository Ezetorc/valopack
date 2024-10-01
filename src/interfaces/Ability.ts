import { BoxType } from "../types/BoxType";
import Method from "./Method";

export default interface Ability {
  name: string;
  description: string;
  usesLeft: number;
  boxTypes: [BoxType];
  range: [number, number];
  methods: Method[];
}
