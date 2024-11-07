import { Dictionary } from './Dictionary.ts'
import { Hexadecimal } from './Hexadecimal.ts'
import { Pack } from './Pack.ts'

export interface Product {
  pack: Pack
  color: Hexadecimal
  amount: number
  price: number
  identifier: keyof Dictionary['packs']
}
