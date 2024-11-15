import { Product } from '../models/Product.ts'
import duelistPackImage from '../assets/images/duelist_pack.webp'
import controllerPackImage from '../assets/images/controller_pack.webp'
import initiatorPackImage from '../assets/images/initiator_pack.webp'
import sentinelPackImage from '../assets/images/sentinel_pack.webp'
import mixedPackImage from '../assets/images/mixed_pack.webp'
import newPackImage from '../assets/images/new_pack.webp'

export const products: Product[] = [
  {
    pack: {
      type: 'duelist',
      image: duelistPackImage
    },
    color: '#833d25',
    amount: 1,
    price: 2000,
    identifier: 'duelist'
  },
  {
    pack: {
      type: 'controller',
      image: controllerPackImage
    },
    color: '#234950',
    amount: 1,
    price: 2000,
    identifier: 'controller'
  },
  {
    pack: {
      type: 'initiator',
      image: initiatorPackImage
    },
    color: '#1f4531',
    amount: 1,
    price: 2000,
    identifier: 'initiator'
  },
  {
    pack: {
      type: 'sentinel',
      image: sentinelPackImage
    },
    color: '#4a4a4a',
    amount: 1,
    price: 2000,
    identifier: 'sentinel'
  },
  {
    pack: {
      type: 'new',
      image: newPackImage
    },
    color: '#7b0707',
    amount: 1,
    price: 5000,
    identifier: 'new'
  },
  {
    pack: {
      type: 'mixed',
      image: mixedPackImage
    },
    color: '#70226d',
    amount: 1,
    price: 3000,
    identifier: 'mixed'
  }
]
