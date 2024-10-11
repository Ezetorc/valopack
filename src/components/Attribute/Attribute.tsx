import { useState } from 'react'
import './Attribute.css'

interface AttributeProps {
  text: { name: string; description: string }
  value: number
}

export default function Attribute ({ text, value }: AttributeProps) {
  const [showDescription, setShowDescription] = useState<boolean>(false)

  return (
    <button
      onClick={() => setShowDescription(!showDescription)}
      className='attribute'
    >
      {!showDescription ? (
        <>
          <span key='name' className='changed'>
            {text.name}
          </span>
          <span key='value' className='changed'>
            {value}
          </span>
        </>
      ) : (
        <span key='description' className='changed'>
          {text.description}
        </span>
      )}
    </button>
  )
}
