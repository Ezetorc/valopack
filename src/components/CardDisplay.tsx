import React from 'react'
import { useSettings } from '../hooks/useSettings'
import { Card } from '../models/Card'

function CardDisplay ({ card }: { card: Card }) {
  const { texts } = useSettings()
  const { image, name, role, level } = card

  return (
    <div className='w-full max-w-[300px] min-w-[200px] aspect-[9/16] flex bg-v_red rounded-[20px] relative overflow-hidden'>
      <div className='w-[101%] h-[101%] absolute bg-v_gray clip-path-card'></div>
      <img
        src={image}
        alt='Agent Image'
        className='w-full scale-[1.8] pt-[38%] absolute z-[15]'
      />
      <div className='w-full h-[25%] flex flex-col items-center justify-center pt-[5%] z-[10]'>
        <span className='font-stroke w-full text-center text-[clamp(24px,2.3vw,60px)]'>
          {name}
        </span>
        <span className='font-stroke w-full text-center text-[clamp(24px,2vw,50px)]'>
          {texts[role]}
        </span>
      </div>
      <span className='font-stroke text-[clamp(24px,4vw,20px)] absolute text-center bottom-0 w-full z-[200]'>
        {`${texts.level}: ${level}`}
      </span>
    </div>
  )
}

export default React.memo(CardDisplay)
