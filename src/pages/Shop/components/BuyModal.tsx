import { Modal } from '../../../components/Modal.tsx'
import { useShop } from '../hooks/useShop.ts'
import { useSettings } from '../../../hooks/useSettings.ts'
import { useUser } from '../../../hooks/useUser.ts'
import { sounds } from '../../../constants/sounds.ts'
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
    if (selectedProduct) {
      buy(selectedProduct)
    }
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
