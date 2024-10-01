import AffectParams from "../interfaces/MethodParams/AffectParams";
import ModifyAttributeParams from "../interfaces/MethodParams/ModifyAttributeParams";
import ReplaceParams from "../interfaces/MethodParams/ReplaceParams";
import WaitParams from "../interfaces/MethodParams/WaitParams";

export type MethodParams = ReplaceParams | ModifyAttributeParams | WaitParams | AffectParams;
