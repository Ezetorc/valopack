import { Link } from 'react-router-dom'
import { sounds } from '../../../constants/sounds.ts'

interface SectionLinkProps {
  to: string
  text: string
  image: string
  className?: string
  imgClassName?: string
}

export function SectionLink ({
  to,
  text,
  image,
  className,
  imgClassName
}: SectionLinkProps) {
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
      className={`relative overflow-hidden ${className}`}
      to={to}
    >
      <img className={imgClassName} src={image} />
      <span className='left-0 bottom-0 absolute w-full text-white text no-underline text-left pl-[5%]'>
        {text}
      </span>
    </Link>
  )
}
