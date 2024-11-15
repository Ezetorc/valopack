import React from 'react'
import { useSettings } from '../hooks/useSettings'
import { Card } from '../models/Card'
import './CardDisplay.css'

function CardDisplay ({ card }: { card: Card }) {
  const { texts } = useSettings()
  const { image, name, role, level } = card

  return (
    <div className='card'>
      <div className='card__bg' />
      <img src={image} alt='Agent Image' />
      <div className='card__info'>
        <span>{name}</span>
        <span>{texts[role]}</span>
      </div>
      <span className='card__level'>{`${texts.level}: ${level}`}</span>
    </div>
  )
}

export default React.memo(CardDisplay)
