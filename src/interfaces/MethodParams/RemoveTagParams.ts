import Tag from '../Tag'
import GetParams from './GetParams'

export default interface RemoveTagParams {
  get: GetParams
  tags: Tag[]
}
