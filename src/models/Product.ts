import { Hexadecimal } from './Hexadecimal'
import {Pack} from './Pack'

export interface Product {
  pack: Pack
  color: Hexadecimal
  amount: number
}
