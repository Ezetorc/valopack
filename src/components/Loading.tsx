import { useSettings } from '../hooks/useSettings.ts'
import './Loading.css'

export default function Loading () {
  const { texts } = useSettings()

  return <div className='loading'>{`${texts.loading}...`}</div>
}
