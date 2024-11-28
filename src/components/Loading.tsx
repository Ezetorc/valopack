import { useSettings } from '../hooks/useSettings.ts'

export default function Loading () {
  const { texts } = useSettings()

  return (
    <div className='absolute w-screen h-screen flex justify-center items-center text-[clamp(30px,20vw,100px)] z-[500]'>
      {`${texts.loading}...`}
    </div>
  )
}
