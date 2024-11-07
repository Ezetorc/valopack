import { Link } from 'react-router-dom'
import { useSettings } from '../../../hooks/useSettings.ts'
import { Modal } from '../../../components/Modal.tsx'
import { useUser } from '../../../hooks/useUser.ts'
import { Result } from '../models/Result.ts'
import './ResultModal.css'
import { paths } from '../../../valopack.config.ts'

interface ResultModalProps {
  result: Result
}

export function ResultModal ({ result }: ResultModalProps) {
  const { texts } = useSettings()
  const { addCredits, removeCredits } = useUser()
  if (!result) return
  let creditsWinned: string = ''

  if (result === 'ally') {
    addCredits(1000)
    creditsWinned = '+1000'
  } else if (result === 'enemy') {
    removeCredits(500)
    creditsWinned = '-500'
  } else if (result === 'draw') {
    addCredits(500)
    creditsWinned = '+500'
  }

  return (
    <Modal className='winner-modal'>
      <span className='winner-modal__winner'>{texts.result[result]}</span>
      <span className='winner-modal__credits'>{`${creditsWinned} ${texts.credits}`}</span>
      <Link to={paths.home}>{texts.home}</Link>
    </Modal>
  )
}
