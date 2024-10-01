import { BoxType } from "../../types/BoxType";
import { GetType } from "../../types/GetType";
import { Team } from "../../types/Team";

export default interface GetParams {
  getType: GetType;
  boxTypes?: BoxType[];
  range?: number;
  team?: Team | "any";
  affectedCodes?: string[];
}
