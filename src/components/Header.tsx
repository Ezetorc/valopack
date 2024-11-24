import { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import creditsKingdomImage from '../assets/images/kingdom_credits.webp'
import { useSettings } from '../hooks/useSettings.ts'
import { useUser } from '../hooks/useUser.ts'
import { sounds } from '../constants/sounds.ts'
import Loading from './Loading.tsx'
import { paths, appName } from '../valopack.config.ts'

const LazySettings = lazy(() => import('./Settings.tsx'))

export function Header () {
  const { credits } = useUser()
  const { texts, settingsOpen, setSettingsOpen } = useSettings()

  const handleClick = (): void => {
    sounds.click.play()
  }

  const handleMouseEnter = (): void => {
    sounds.hover.play()
  }

  const handleOpen = (): void => {
    setSettingsOpen(true)
    sounds.click.play()
  }

  return (
    <>
      <header className='flex justify-center fixed top-0 z-[500] w-full h-[12vh] grid-row-1'>
        <div className='relative w-[60%] h-full grid grid-cols-[1fr_2fr_1fr]'>
          <div className='absolute w-full h-[98%] bg-black bg-opacity-40 clip-header-aside z-[400]'></div>

          <div className='z-[450] flex items-center overflow-hidden justify-end pr-[10%] h-[70%]'>
            <button
              onMouseEnter={handleMouseEnter}
              onClick={handleOpen}
              className='bg-transparent border-none font-stroke cursor-pointer max-h-[100px] aspect-[2/1] flex justify-center items-center text-[clamp(1rem,3vw,4rem)] hover:text-v_aqua'
            >
              {texts.settings}
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
            <span className='relative max-h-[60px] w-[40%] text-[clamp(1rem,3vw,4rem)] flex justify-end items-center'>
              {credits}
            </span>
            <img
              title={texts.credits}
              src={creditsKingdomImage}
              alt={texts.credits}
              className='max-h-[50px] overflow-hidden'
            />
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
