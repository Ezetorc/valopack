import { AddClassParams } from './params/AddClassParams'
import { AddEntityParams } from './params/AddEntityParams'
import { AddTagParams } from './params/AddTagParams'
import { ModifyAttributeParams } from './params/ModifyAttributeParams'
import { RemoveClassParams } from './params/RemoveClassParams'
import { RemoveEntityParams } from './params/RemoveEntityParams'
import { RemoveTagParams } from './params/RemoveTagParams'
import { ShowFadeParams } from './params/ShowFadeParams'
import { WaitParams } from './params/WaitParams'

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
    | 'remove-class'
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
