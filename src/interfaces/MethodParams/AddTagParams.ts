import Tag from '../Tag'
import GetParams from './GetParams'

export default interface AddTagParams {
  get: GetParams
  tags: Tag[]
}
