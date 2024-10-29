import ModifyAttributeParams from './MethodParams/ModifyAttributeParams'
import WaitParams from './MethodParams/WaitParams'
import AddTagParams from './MethodParams/AddTagParams'
import AddBoxParams from './MethodParams/AddBoxParams'
import RemoveBoxParams from './MethodParams/RemoveBoxParams'
import RemoveTagParams from './MethodParams/RemoveTagParams'
import ShowFadeParams from './MethodParams/ShowFadeParams'
import AddClassParams from './MethodParams/AddClassParams'
import RemoveClassParams from './MethodParams/RemoveClassParams'

export default interface Method {
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
