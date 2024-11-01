import {GetParams} from './GetParams'

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
