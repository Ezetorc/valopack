import { useSettings } from '../hooks/useSettings'
import { useUser } from '../hooks/useUser'
import { CloseButton } from './CloseButton'
import { Modal } from './Modal'

export default function Credits() {
  const { setCreditsOpen, texts } = useSettings()
  const { getCredits } = useUser()
  const credits: number = getCredits()

  const handleClose = (): void => {
    setCreditsOpen(false)
  }

  return (
    <Modal>
      <header className='w-full h-[20%] grid grid-cols-[2fr,1fr] place-items-center border-b-white border-b-[1px]'>
        <span className='text-[clamp(40px,3vw,70px)] text-center'>{texts.credits}</span>
        <CloseButton className='w-[clamp(110px,10vw,130px)] mr-[15%]' onClose={handleClose} />
      </header>

      <div className='w-full h-[80%] flex justify-center p-[5%]'>
        <span className='text-[clamp(30px,3vw,40px)] text-[#ccc]'>
          {`${texts.youHave} ${credits} ${texts.credits}. ${texts.creditsInfo}`}
        </span>
      </div>
    </Modal>
  )
}
