import { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import creditsKingdomImage from '../assets/images/kingdom_credits.webp'
import { useSettings } from '../hooks/useSettings'
import { useUser } from '../hooks/useUser'
import sounds from '../constants/sounds'
import Loading from './Loading'
import './Header.css'
import { paths, appName } from '../valopack.config'

const LazySettings = lazy(() => import('./Settings'))

export function Header () {
  const { credits } = useUser()
  const { texts, settingsOpen, setSettingsOpen } = useSettings()

  const handleClick = () => {
    sounds.click.play()
  }

  const handleMouseEnter = () => {
    sounds.hover.play()
  }

  const handleOpen = () => {
    setSettingsOpen(true)
    sounds.click.play()
  }

  return (
    <>
      <header className='header'>
        <div className='header__subcontainer'>
          <div className='header__bg' />
          <div className='header__settings header__option'>
            <button onMouseEnter={handleMouseEnter} onClick={handleOpen}>
              {texts.settings}
            </button>
          </div>
          <div className='header__title header__option'>
            <Link to={paths.home} onClick={handleClick}>
              {appName}
            </Link>
          </div>
          <div className='header__credits header__option'>
            <span>{credits}</span>
            <img
              title={texts.credits}
              src={creditsKingdomImage}
              alt={texts.credits}
            ></img>
          </div>
        </div>
      </header>

      {settingsOpen && (
        <Suspense fallback={<Loading />}>
          <LazySettings />
        </Suspense>
      )}
    </>
  )
}