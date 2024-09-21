import { MethodParams } from "../types/MethodParams";
import { MethodType } from "../types/MethodType";

export default interface Method {
  type: MethodType;
  params: MethodParams;
}
