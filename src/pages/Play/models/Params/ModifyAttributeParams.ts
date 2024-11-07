import { GetParams } from "./GetParams.ts";

export interface ModifyAttributeParams {
  get: GetParams
  attribute:
    | 'speed'
    | 'attack'
    | 'health'
    | 'defense'
    | 'precision'
    | 'critic'
    | 'resistance';
  amount: number
}
