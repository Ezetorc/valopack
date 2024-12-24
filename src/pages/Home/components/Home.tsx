import vyzeImage from '../assets/images/vyse.webp'
import vandalImage from '../assets/images/vandal.webp'
import omenImage from '../assets/images/omen.webp'
import { useEffect } from 'react'
import { useSettings } from '../../../hooks/useSettings.ts'
import { useUser } from '../../../hooks/useUser.ts'
import { useShop } from '../../Shop/hooks/useShop.ts'
import { Header } from '../../../components/Header.tsx'
import { SectionLink } from './SectionLink.tsx'
import { paths } from '../../../valopack.config.ts'

export default function Home () {
  const { updatePage, texts } = useSettings()
  const { setSelectorVisible } = useUser()
  const { setOwnedProduct, setSelectedProduct } = useShop()

  useEffect(() => {
    setSelectorVisible(false)
    setOwnedProduct(null)
    setSelectedProduct(null)
    updatePage('home')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className='w-full min-h-screen'>
      <Header />

      <div className='grid xl:grid-cols-2 xl:grid-rows-2 xl:place-items-center gap-x-[3%] gap-y-[6%] p-[3%] tm:grid-flow-row tm:grid-cols-[] tm:grid-rows-[]'>
        <SectionLink
          className='[background:linear-gradient(43deg,#161526_10%,#6052b6_100%)] xl:hover:border-v_aqua row-span-2 items-end'
          imgClassName='max-w-[clamp(200px,70%,500px)] tm:top-0 tm:absolute xl:relative'
          to={paths.play}
          text={texts.play}
          image={vyzeImage}
        />
        <SectionLink
          className='[background:linear-gradient(43deg,#361525_10%,#95426b_100%)] xl:hover:border-[#ff852e] items-center'
          imgClassName='max-w-[clamp(200px,70%,500px)] h-full tm:top-0 tm:absolute xl:relative'
          to={paths.shop}
          text={texts.shop}
          image={vandalImage}
        />
        <SectionLink
          className='[background:linear-gradient(43deg,#0a2759_10%,#2b578b_100%)] xl:hover:border-[#4250e6] items-end'
          imgClassName='max-w-[clamp(200px,50%,350px)] tm:top-0 tm:absolute xl:relative'
          to={paths.team}
          text={texts.team}
          image={omenImage}
        />
      </div>
    </main>
  )
}
