import { SectionLink } from './SectionLink'
import vyzeImage from '../assets/images/vyse.webp'
import vandalImage from '../assets/images/vandal.webp'
import omenImage from '../assets/images/omen.webp'
import { useEffect } from 'react'
import { useSettings } from '../../../hooks/useSettings'
import { useUser } from '../../../hooks/useUser'
import { useShop } from '../../Shop/hooks/useShop'
import './Home.css'
import { backgrounds, paths } from '../../../valopack.config'

export default function Home () {
  const { texts, updateSection } = useSettings()
  const { setAgentToChange } = useUser()
  const { setOwnedProduct, setSelectedProduct } = useShop()

  useEffect(() => {
    setAgentToChange(null)
    setOwnedProduct(null)
    setSelectedProduct(null)
    updateSection(texts.home, backgrounds.home, true)
  })

  return (
    <section className='home'>
      <SectionLink to={paths.play} text={texts.play} image={vyzeImage} />
      <SectionLink to={paths.shop} text={texts.shop} image={vandalImage} />
      <SectionLink to={paths.team} text={texts.team} image={omenImage} />
    </section>
  )
}