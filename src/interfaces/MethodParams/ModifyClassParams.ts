import GetParams from './GetParams'

export default interface ModifyClassParams {
  get: GetParams
  method: 'add' | 'remove'
  classNames: string[]
}
