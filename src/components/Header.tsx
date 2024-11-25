import { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import creditsKingdomImage from '../assets/images/kingdom_credits.webp'
import { useSettings } from '../hooks/useSettings.ts'
import { useUser } from '../hooks/useUser.ts'
import { clickAudio, hoverAudio } from '../constants/audios.ts'
import Loading from './Loading.tsx'
import { paths, appName } from '../valopack.config.ts'
import { AudioOFFIcon, AudioONIcon, SettingsIcon } from './Icons.tsx'

const LazySettings = lazy(() => import('./Settings.tsx'))
const LazyCredits = lazy(() => import('./Credits.tsx'))

export function Header () {
  const { credits } = useUser()
  const {
    texts,
    settingsOpen,
    setSettingsOpen,
    playAudio,
    toggleAudioMuted,
    isAudioMuted,
    creditsOpen,
    setCreditsOpen
  } = useSettings()

  const handleToggleAudio = () => {
    toggleAudioMuted()
  }

  const handleClick = (): void => {
    playAudio(clickAudio)
  }

  const handleOpenCredits = (): void => {
    playAudio(clickAudio)
    setCreditsOpen(true)
  }

  const handleMouseEnter = (): void => {
    playAudio(hoverAudio)
  }

  const handleOpen = (): void => {
    setSettingsOpen(true)
    playAudio(clickAudio)
  }

  return (
    <>
      <header className='flex justify-center fixed top-0 z-[500] w-full h-[12vh] grid-row-1'>
        <div className='relative w-full xl:w-[60%] h-full grid grid-cols-[1fr_2fr_1fr]'>
          <div className='absolute w-full h-[98%] bg-black bg-opacity-40 xl:clip-header-aside z-[400]'></div>

          <div className='z-[450] flex items-center overflow-hidden justify-center pl-[20%] gap-[10%] h-[70%] pb-[5%]'>
            <button
              onMouseEnter={handleMouseEnter}
              onClick={handleOpen}
              className='bg-transparent border-none font-stroke cursor-pointer max-h-[100px] aspect-[2/1] flex justify-center items-center text-[clamp(1rem,3vw,4rem)] hover:text-v_aqua'
            >
              <SettingsIcon />
            </button>
            <button
              onMouseEnter={handleMouseEnter}
              onClick={handleToggleAudio}
              className='bg-transparent border-none font-stroke cursor-pointer max-h-[100px] aspect-[2/1] flex justify-center items-center text-[clamp(1rem,3vw,4rem)] hover:text-v_aqua'
            >
              {isAudioMuted ? <AudioOFFIcon /> : <AudioONIcon />}
            </button>
          </div>

          <div
            onMouseEnter={handleMouseEnter}
            className='z-[450] flex items-center justify-center bg-v_red hover:bg-white clip-header-center h-[80%] text-[clamp(1rem,7vw,7rem)]'
          >
            <Link
              to={paths.home}
              onClick={handleClick}
              className='w-full h-full flex justify-center items-center text-white no-underline hover:text-[var(--main-color)] hover:text-v_red'
            >
              {appName}
            </Link>
          </div>

          <div className='z-[450] flex items-center justify-start h-[70%] pl-[10%] gap-[10px]'>
            <button
              className='relative max-h-[60px] w-[40%] text-[clamp(1rem,3vw,4rem)] flex justify-end items-center hover:text-v_aqua'
              onClick={handleOpenCredits}
              onMouseEnter={handleMouseEnter}
            >
              {credits}
            </button>
            <img
              title={texts.credits}
              src={creditsKingdomImage}
              alt={texts.credits}
              className='max-h-[50px] overflow-hidden'
            />
          </div>
        </div>
      </header>

      <Suspense fallback={<Loading />}>
        {settingsOpen && <LazySettings />}
        {creditsOpen && <LazyCredits />}
      </Suspense>
    </>
  )
}
