import { AddClassParams } from './AddClassParams'
import { AddEntityParams } from './AddEntityParams'
import { AddTagParams } from './AddTagParams'
import { ModifyAttributeParams } from './ModifyAttributeParams'
import { RemoveClassParams } from './RemoveClassParams'
import { RemoveEntityParams } from './RemoveEntityParams'
import { RemoveTagParams } from './RemoveTagParams'
import { ShowFadeParams } from './ShowFadeParams'
import { WaitParams } from './WaitParams'

export interface Method {
  type:
    | 'modify-attribute'
    | 'wait'
    | 'add-tag'
    | 'remove-tag'
    | 'add-box'
    | 'remove-box'
    | 'show-fade'
    | 'add-class'
    | 'remove-class',
  params:
    | ModifyAttributeParams
    | WaitParams
    | AddTagParams
    | AddEntityParams
    | RemoveEntityParams
    | RemoveTagParams
    | ShowFadeParams
    | AddClassParams
    | RemoveClassParams
}
