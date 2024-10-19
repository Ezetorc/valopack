import SectionLink from '../SectionLink/SectionLink'
import vyzeImage from '../../assets/images/home/vyse.webp'
import vandalImage from '../../assets/images/home/vandal.webp'
import omenImage from '../../assets/images/home/omen.webp'
import { useEffect } from 'react'
import useSettings from '../../hooks/useSettings'
import useUser from '../../hooks/useUser'
import useShop from '../../hooks/useShop'
import { paths } from '../../constants/general'
import { sectionsBackgrounds } from '../../constants/sectionsBackground'
import './Home.css'

export default function Home () {
  const { texts, updateSection } = useSettings()
  const { setAgentToChange } = useUser()
  const { setOwnedProduct, setSelectedProduct } = useShop()

  useEffect(() => {
    setAgentToChange(null)
    setOwnedProduct(null)
    setSelectedProduct(null)
    updateSection(texts.home, sectionsBackgrounds.home, true)
  })

  return (
    <section className='home'>
      <SectionLink to={paths.play} text={texts.play} image={vyzeImage} />
      <SectionLink to={paths.shop} text={texts.shop} image={vandalImage} />
      <SectionLink to={paths.team} text={texts.team} image={omenImage} />
    </section>
  )
}
