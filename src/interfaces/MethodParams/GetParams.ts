import { BoxType } from "../../types/BoxType";
import { GetType } from "../../types/GetType";
import { Team } from "../../types/Team";

export default interface GetParams {
  getType: GetType;
  boxType?: BoxType;
  range?: number;
  team?: Team | "any";
}
