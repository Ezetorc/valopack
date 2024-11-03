import { Dictionary } from './Dictionary'
import { Hexadecimal } from './Hexadecimal'
import { Pack } from './Pack'

export interface Product {
  pack: Pack
  color: Hexadecimal
  amount: number
  price: number
  identifier: keyof Dictionary['packs']
}
