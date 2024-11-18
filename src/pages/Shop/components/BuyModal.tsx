import { Modal } from '../../../components/Modal.tsx'
import { useShop } from '../hooks/useShop.ts'
import { useSettings } from '../../../hooks/useSettings.ts'
import { useUser } from '../../../hooks/useUser.ts'
import { sounds } from '../../../constants/sounds.ts'

interface BuyModalProps {
  canBuy: boolean
}

export function BuyModal ({ canBuy }: BuyModalProps) {
  const { texts } = useSettings()
  const { credits } = useUser()
  const { selectedProduct, setSelectedProduct, buy } = useShop()
  if (!selectedProduct) return null

  const handleClick = (): void => {
    if (selectedProduct) {
      buy(selectedProduct)
    }
  }

  const handleLoad = (): Promise<void> => {
    return sounds.purchase.play()
  }

  return (
    <Modal
      className='bg-[#0b1430] w-[25%] aspect-[12/13] relative border-y border-white grid items-center gap-[5%] p-[2%] grid-cols-2 grid-rows-2 animate-appear'
      onLoad={handleLoad}
    >
      {canBuy ? (
        <>
          <span className='col-span-2 flex items-center justify-center text-center text-wrap text-[clamp(50px,3vw,60px)] w-full h-full'>
            {texts.wannaBuy(texts.packs[selectedProduct.identifier])}
          </span>
          <button
            onClick={() => setSelectedProduct(null)}
            className='aspect-[16/9] cursor-pointer text-[clamp(50px,2vw,100px)] font-stroke bg-v_red_gradient border-v_red border-2 border-main max-h-[130px] w-full hover:border-white'
          >
            {texts.close}
          </button>
          <button
            onClick={handleClick}
            className='aspect-[16/9] cursor-pointer text-[clamp(50px,2vw,100px)] font-stroke bg-v_aqua_gradient border-2 border-v_aqua border-hover max-h-[130px] w-full hover:border-white'
          >
            {texts.buy}
          </button>
        </>
      ) : (
        <>
          <span className='col-span-2 flex items-center justify-center text-center text-wrap text-[clamp(50px,3vw,60px)] w-full h-full'>
            {texts.cantBuy(
              selectedProduct,
              texts.packs[selectedProduct.identifier],
              credits
            )}
          </span>
          <button
            onClick={() => setSelectedProduct(null)}
            className='aspect-[16/9] cursor-pointer text-[clamp(50px,2vw,100px)] font-stroke bg-v_red_gradient border-v_red border-2 border-main max-h-[130px] w-full hover:border-white col-span-2'
          >
            {texts.close}
          </button>
        </>
      )}
    </Modal>
  )
}
