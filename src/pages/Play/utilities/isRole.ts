import { Role } from '../../../models/Role'

export  function isRole (foo: string): foo is Role {
  return ['controller', 'duelist', 'sentinel', 'initiator'].includes(foo)
}
