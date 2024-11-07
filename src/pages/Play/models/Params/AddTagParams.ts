import {Tag} from '../Tag.ts'
import { GetParams } from './GetParams.ts'

export interface AddTagParams {
  get: GetParams
  tags: Tag[]
}
