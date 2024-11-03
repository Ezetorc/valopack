import {Tag} from '../Tag'
import { GetParams } from './GetParams'

export interface AddTagParams {
  get: GetParams
  tags: Tag[]
}
