import { Link } from 'react-router-dom'
import { clickAudio, hoverAudio } from '../../../constants/audios.ts'
import { useSettings } from '../../../hooks/useSettings.ts'

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
  const { playAudio } = useSettings()

  const handleHover = (): void => {
    playAudio(hoverAudio)
  }

  const handleClick = (): void => {
    playAudio(clickAudio)
  }

  return (
    <Link
      onClick={handleClick}
      onMouseEnter={handleHover}
      className={`relative overflow-hidden ${className}`}
      to={to}
    >
      <img className={imgClassName} src={image} alt={text} />
      <span className='left-0 bottom-0 absolute w-full text-white text no-underline text-left pl-[5%]'>
        {text}
      </span>
    </Link>
  )
}
