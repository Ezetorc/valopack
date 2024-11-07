import { Role } from '../../../models/Role.ts'

export  function isRole (foo: string): foo is Role {
  return ['controller', 'duelist', 'sentinel', 'initiator'].includes(foo)
}
