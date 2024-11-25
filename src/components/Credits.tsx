import { useSettings } from '../hooks/useSettings'
import { useUser } from '../hooks/useUser'
import { CloseButton } from './CloseButton'
import { Modal } from './Modal'

export default function Credits () {
  const { setCreditsOpen, texts } = useSettings()
  const { credits } = useUser()

  const handleClose = (): void => {
    setCreditsOpen(false)
  }

  return (
    <Modal>
      <header className='w-full h-[20%] grid grid-cols-[2fr,1fr] place-items-center border-b-white border-b-[1px]'>
        <span className='text-[clamp(30px,3vw,35px)] text-center'>{`${texts.youHave} ${credits} ${texts.credits}`}</span>
        <CloseButton className='w-[90%] mr-[5%]' onClose={handleClose} />
      </header>

      <div className='w-full h-[80%] flex justify-center p-[5%]'>
        <span className='text-[clamp(20px,3vw,40px)] text-[#ccc]'>{texts.creditsInfo}</span>
      </div>
    </Modal>
  )
}
