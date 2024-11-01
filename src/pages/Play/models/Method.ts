import {AddTagParams} from './Params/AddTagParams'
import {AddBoxParams} from './Params/AddBoxParams'
import {RemoveBoxParams} from './Params/RemoveBoxParams'
import {ShowFadeParams} from './Params/ShowFadeParams'
import {AddClassParams} from './Params/AddClassParams'
import {ModifyAttributeParams} from './Params/ModifyAttributeParams'
import {RemoveClassParams} from './Params/RemoveClassParams'
import {RemoveTagParams} from './Params/RemoveTagParams'
import {WaitParams} from './Params/WaitParams'

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
