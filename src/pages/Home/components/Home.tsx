import { SectionLink } from './SectionLink.tsx'
import vyzeImage from '../assets/images/vyse.webp'
import vandalImage from '../assets/images/vandal.webp'
import omenImage from '../assets/images/omen.webp'
import { useEffect } from 'react'
import { useSettings } from '../../../hooks/useSettings.ts'
import { useUser } from '../../../hooks/useUser.ts'
import { useShop } from '../../Shop/hooks/useShop.ts'
import './Home.css'
import { backgrounds, paths } from '../../../valopack.config.ts'

export default function Home () {
  const { texts, updateSection } = useSettings()
  const { setCardToChange } = useUser()
  const { setOwnedProduct, setSelectedProduct } = useShop()

  useEffect(() => {
    setCardToChange(null)
    setOwnedProduct(null)
    setSelectedProduct(null)
    updateSection(texts.home, backgrounds.home, true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className='home'>
      <SectionLink to={paths.play} text={texts.play} image={vyzeImage} />
      <SectionLink to={paths.shop} text={texts.shop} image={vandalImage} />
      <SectionLink to={paths.team} text={texts.team} image={omenImage} />
    </section>
  )
}
