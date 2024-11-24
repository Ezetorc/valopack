import { Link } from 'react-router-dom'
import { useSettings } from '../../../hooks/useSettings.ts'
import { Modal } from '../../../components/Modal.tsx'
import { Result } from '../models/Result.ts'
import { paths } from '../../../valopack.config.ts'

interface ResultModalProps {
  result: Result
}

export function ResultModal({ result }: ResultModalProps) {
  const { texts } = useSettings()
  if (!result) return null

  const creditsWinned =
    result === 'ally' ? '+1000' : result === 'enemy' ? '-500' : '+500'

  return (
    <Modal className='flex flex-col justify-center items-center'>
      <span className='w-full text-center text-[clamp(20px,_5vw,_100px)]'>
        {texts.result[result]}
      </span>
      <span className='w-full text-center text-[clamp(20px,_3vw,_60px)]'>{`${creditsWinned} ${texts.credits}`}</span>
      <Link
        to={paths.home}
        className='bg-v_red_gradient border-[2px] border-v_red text-[clamp(20px,_5vw,_80px)] flex justify-center items-center text-white no-underline w-[60%] aspect-video hover:border-white'
      >
        {texts.home}
      </Link>
    </Modal>
  )
}
