import { useState } from 'react'
import {useShop} from '../hooks/useShop'
import {useSettings} from '../../../hooks/useSettings'
import sounds from '../../../constants/sounds'
import './Opener.css'
import Card from './Card'
import {Pack} from './Pack'

export function Opener () {
  const { ownedProduct, ownedAgents, setOwnedProduct } = useShop()
  const { texts } = useSettings()
  const [showCards, setShowCards] = useState<boolean>(false)
  if (!ownedProduct) return null

  const handleAnimationEnd = () => {
    setShowCards(true)
  }
  
  const handleClose = () => {
    setOwnedProduct(null)
    sounds.click.play()
  }

  return (
    <section className='opener'>
      {showCards ? (
        <div className='opener__cards'>
          <div>
            {ownedAgents ? (
              ownedAgents.map((card, index) => (
                <Card
                  key={index}
                  image={card.portrait}
                  role={card.role}
                  name={card.name}
                  level={card.level}
                />
              ))
            ) : (
              <span>{`${texts.loading}...`}</span>
            )}
          </div>

          <button onClick={handleClose}>{texts.close}</button>
        </div>
      ) : (
        <Pack onAnimationEnd={handleAnimationEnd} />
      )}
    </section>
  )
}
