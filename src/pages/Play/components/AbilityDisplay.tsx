import { useSettings } from '../../../hooks/useSettings'
import { Ability } from '../models/Ability'

export function AbilityDisplay ({ ability }: { ability: Ability }) {
  const { texts } = useSettings()
  if (!ability.identifier) return
  const info = texts.abilities[ability.identifier]

  return (
    <article className='w-[clamp(200px,100%,600px)] h-[280px] rounded-xl bg-v_red_gradient mb-[5%] flex flex-col p-[2%] gap-[5%] animate-changed'>
      <span className='w-full h-[20%] text-[clamp(30px,3vw,45px)] text-left underline'>
        {info.name}
      </span>
      <span className='w-full h-[80%] text-[clamp(30px,3vw,33px)]'>
        {info.description}
      </span>
    </article>
  )
}
