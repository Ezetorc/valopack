import { Dictionary } from '../../../models/Dictionary.ts'
import { Hexadecimal } from '../../../models/Hexadecimal.ts'
import { Pack } from './Pack.ts'

export interface Product {
  pack: Pack
  color: Hexadecimal
  cardsAmount: number
  price: number
  identifier: keyof Dictionary['packs']
}
