import AddParams from './MethodParams/AddParams'
import FadeParams from './MethodParams/FadeParams'
import ModifyAttributeParams from './MethodParams/ModifyAttributeParams'
import ModifyClassParams from './MethodParams/ModifyClassParams'
import RemoveParams from './MethodParams/RemoveParams'
import TagParams from './MethodParams/TagParams'
import WaitParams from './MethodParams/WaitParams'

export default interface Method {
  type:
    | 'modifyAttribute'
    | 'wait'
    | 'tag'
    | 'add'
    | 'remove'
    | 'fade'
    | 'modifyClass';
  params:
    | ModifyAttributeParams
    | WaitParams
    | TagParams
    | AddParams
    | RemoveParams
    | FadeParams
    | ModifyClassParams
}
