import { AddTagParams } from './params/AddTagParams'
import { AddBoxParams } from './params/AddBoxParams'
import { RemoveBoxParams } from './params/RemoveBoxParams'
import { ShowFadeParams } from './params/ShowFadeParams'
import { AddClassParams } from './params/AddClassParams'
import { ModifyAttributeParams } from './params/ModifyAttributeParams'
import { RemoveClassParams } from './params/RemoveClassParams'
import { RemoveTagParams } from './params/RemoveTagParams'
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
    | AddBoxParams
    | RemoveBoxParams
    | RemoveTagParams
    | ShowFadeParams
    | AddClassParams
    | RemoveClassParams
}
