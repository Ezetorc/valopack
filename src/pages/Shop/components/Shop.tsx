import { useEffect } from 'react'
import { useSettings } from '../../../hooks/useSettings.ts'
import { useUser } from '../../../hooks/useUser.ts'
import { useShop } from '../hooks/useShop.ts'
import { BuyModal } from './BuyModal.tsx'
import { products } from '../constants/products.ts'
import { ProductDisplay } from './ProductDisplay.tsx'
import { PackOpener } from './PackOpener.tsx'
import { Header } from '../../../components/Header.tsx'
import { Product } from '../models/Product.ts'

export default function Shop () {
  const { getOwnedProduct, getSelectedProduct } = useShop()
  const { getCredits } = useUser()
  const ownedProduct: Product | null = getOwnedProduct()
  const selectedProduct: Product | null = getSelectedProduct()
  const credits: number = getCredits()
  const { updatePage } = useSettings()
  const canBuy: boolean = selectedProduct
    ? credits >= selectedProduct.price
    : false

  useEffect(() => {
    updatePage('shop')
  })

  return (
    <>
      {selectedProduct && <BuyModal canBuy={canBuy} />}

      {!ownedProduct ? (
        <>
          <Header />
          <main className='w-screen min-h-[100vh] grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))]'>
            {products.map((product, index) => (
              <ProductDisplay key={index} product={product} />
            ))}
          </main>
        </>
      ) : (
        <PackOpener />
      )}
    </>
  )
}
