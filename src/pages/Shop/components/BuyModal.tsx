import { Modal } from '../../../components/Modal'
import { useShop } from '../hooks/useShop'
import { useSettings } from '../../../hooks/useSettings'
import { useUser } from '../../../hooks/useUser'
import sounds from '../../../constants/sounds'
import './BuyModal.css'

interface BuyModalProps {
  canBuy: boolean
}

export function BuyModal ({ canBuy }: BuyModalProps) {
  const { texts } = useSettings()
  const { credits } = useUser()
  const { selectedProduct, setSelectedProduct, buy } = useShop()
  if (!selectedProduct) return

  const handleClick = (): void => {
    if (!selectedProduct) return
    buy(selectedProduct)
  }

  const handleLoad = (): Promise<void> => {
    return sounds.purchase.play()
  }

  return (
    <Modal className='buy-modal' onLoad={handleLoad}>
      {canBuy ? (
        <>
          <span>{texts.wannaBuy(texts.packs[selectedProduct.identifier])}</span>
          <button onClick={() => setSelectedProduct(null)}>
            {texts.close}
          </button>
          <button onClick={handleClick}>{texts.buy}</button>
        </>
      ) : (
        <>
          <span>
            {texts.cantBuy(
              selectedProduct,
              texts.packs[selectedProduct.identifier],
              credits
            )}
          </span>
          <button onClick={() => setSelectedProduct(null)}>
            {texts.close}
          </button>
        </>
      )}
    </Modal>
  )
}
