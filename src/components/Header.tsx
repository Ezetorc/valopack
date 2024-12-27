import { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import creditsKingdomImage from '../assets/images/kingdom_credits.webp'
import { useSettings } from '../hooks/useSettings.ts'
import { useUser } from '../hooks/useUser.ts'
import Loading from './Loading.tsx'
import { paths, appName } from '../valopack.config.ts'
import { AudioOFFIcon, AudioONIcon, SettingsIcon } from './Icons.tsx'

const LazySettings = lazy(() => import('./Settings.tsx'))
const LazyCredits = lazy(() => import('./Credits.tsx'))

export function Header () {
  const { getCredits } = useUser()
  const {
    texts,
    getSettingsOpen,
    setSettingsOpen,
    playAudio,
    toggleAudioMuted,
    getIsAudioMuted,
    getCreditsOpen,
    setCreditsOpen
  } = useSettings()

  const handleToggleAudio = () => {
    toggleAudioMuted()
  }

  const handleOpenCredits = (): void => {
    playAudio('click')
    setCreditsOpen(true)
  }

  const handleClick = (): void => {
    playAudio('click')
  }

  const handleMouseEnter = (): void => {
    playAudio('hover')
  }

  const handleOpen = (): void => {
    setSettingsOpen(true)
    playAudio('click')
  }

  return (
    <>
      <header className='sticky w-[clamp(320px,100vw,1920px)] h-[clamp(110px,15vh,300px)] top-0 flex justify-center z-[500]'>
        <div className='bg-[#00000066] xl:w-[90%] md:w-full tm:w-full h-[80%] absolute z-[900] xl:clip-header-aside'></div>
        <ol className='grid grid-cols-[1fr,1.3fr,1fr] w-full h-full absolute z-[1000]'>
          <li className='flex xl:justify-end md:justify-center tm:justify-center items-center xl:pr-[10%] h-[80%] gap-[10%]'>
            <button
              onMouseEnter={handleMouseEnter}
              onClick={handleOpen}
              aria-label={texts.settings}
            >
              <SettingsIcon size='clamp(40px,10vw,80px)' />
            </button>
            <button
              onMouseEnter={handleMouseEnter}
              onClick={handleToggleAudio}
              aria-label={texts.audio}
            >
              {getIsAudioMuted() ? (
                <AudioOFFIcon size='clamp(40px,10vw,80px)' />
              ) : (
                <AudioONIcon size='clamp(40px,10vw,80px)' />
              )}
            </button>
          </li>

          <Link
            to={paths.home}
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
            className='clip-header-center bg-v_red text-center content-center xl:hover:text-v_red xl:hover:bg-white text-[clamp(20px,10vw,90px)]'
          >
            {appName}
          </Link>

          <li className='flex xl:justify-start md:justify-center tm:justify-center items-center xl:pl-[10%] h-[80%] gap-[clamp(5px,5%,10px)]'>
            <button
              onClick={handleOpenCredits}
              className='text-[clamp(25px,6vw,60px)] xl:hover:text-v_aqua'
            >
              {getCredits()}
            </button>
            <img
              src={creditsKingdomImage}
              alt={texts.credits}
              title={texts.credits}
              className='w-[clamp(30px,5vw,70px)] object-contain'
            />
          </li>
        </ol>
      </header>

      <Suspense fallback={<Loading />}>
        {getSettingsOpen() && <LazySettings />}
        {getCreditsOpen() && <LazyCredits />}
      </Suspense>
    </>
  )
}
