import { ModifyAttributeParams, WaitParams, AddTagParams, AddEntityParams, RemoveEntityParams, RemoveTagParams, ShowFadeParams, AddClassParams, RemoveClassParams } from "./params"


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
