import {Tag} from '../Tag'
import { GetParams } from './GetParams'

export interface RemoveTagParams {
  get: GetParams
  tags: Tag[]
}
