import {Tag} from './Tag.ts'
import { GetParams } from './GetParams.ts'

export interface RemoveTagParams {
  get: GetParams
  tags: Tag[]
}
