import Modal from '../Modal/Modal'
import useShop from '../../hooks/useShop'
import useSettings from '../../hooks/useSettings'
import useUser from '../../hooks/useUser'
import sounds from '../../constants/sounds'
import './BuyModal.css'

interface BuyModalProps {
  canBuy: boolean
}

export default function BuyModal ({ canBuy }: BuyModalProps) {
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
          <span>{texts.wannaBuy(selectedProduct.product)}</span>
          <button onClick={() => setSelectedProduct(null)}>
            {texts.close}
          </button>
          <button onClick={handleClick}>{texts.buy}</button>
        </>
      ) : (
        <>
          <span>{texts.cantBuy(selectedProduct.product, credits)}</span>
          <button onClick={() => setSelectedProduct(null)}>
            {texts.close}
          </button>
        </>
      )}
    </Modal>
  )
}
