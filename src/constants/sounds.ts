import clickAudio from '../assets/audio/click.mp3'
import hoverAudio from '../assets/audio/hover.mp3'
import openingAudio from '../assets/audio/opening.mp3'
import purchaseAudio from '../assets/audio/purchase.mp3'

export const sounds: { [key: string]: HTMLAudioElement } = {
  click: new Audio(clickAudio),
  hover: new Audio(hoverAudio),
  purchase: new Audio(purchaseAudio),
  opening: new Audio(openingAudio)
}
