import { useState } from 'react'

interface AttributeProps {
  text: { name: string; description: string }
  value: number
}

export function Attribute ({ text, value }: AttributeProps) {
  const [showDescription, setShowDescription] = useState<boolean>(false)

  return (
    <button
      onClick={() => setShowDescription(!showDescription)}
      className='flex w-full justify-between border-[2px] border-v_red cursor-pointer bg-v_red_gradient'
    >
      {!showDescription ? (
        <>
          <span
            key='name'
            className='animate-changed text-[clamp(20px,_3vw,_80px)] [padding-inline:5%] font-stroke items-center flex'
          >
            {text.name}
          </span>
          <span
            key='value'
            className='animate-changed text-[clamp(20px,_3vw,_80px)] [padding-inline:5%] font-stroke items-center flex'
          >
            {value}
          </span>
        </>
      ) : (
        <span
          key='description'
          className='animate-changed text-[clamp(20px,_3vw,_80px)] [padding-inline:5%] font-stroke items-center flex'
        >
          {text.description}
        </span>
      )}
    </button>
  )
}
