import { Link } from 'react-router-dom'
import { sounds } from '../../../constants/sounds.ts'
import './SectionLink.css'

interface SectionLinkProps {
  to: string
  text: string
  image: string
}

export function SectionLink ({ to, text, image }: SectionLinkProps) {
  const handleHover = () => {
    sounds.hover.play()
  }

  const handleClick = () => {
    sounds.click.play()
  }

  return (
    <Link
      onClick={handleClick}
      onMouseEnter={handleHover}
      className='section-link'
      to={to}
    >
      <img src={image} />
      <span>{text}</span>
    </Link>
  )
}
