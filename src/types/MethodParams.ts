import AddParams from '../interfaces/MethodParams/AddParams'
import AffectParams from '../interfaces/MethodParams/TagParams'
import ModifyAttributeParams from '../interfaces/MethodParams/ModifyAttributeParams'
import RemoveParams from '../interfaces/MethodParams/RemoveParams'
import WaitParams from '../interfaces/MethodParams/WaitParams'

export type MethodParams =
  | ModifyAttributeParams
  | WaitParams
  | AffectParams
  | AddParams
  | RemoveParams
