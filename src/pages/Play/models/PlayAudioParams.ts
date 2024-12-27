import { Audios } from "../../../constants/Audios";

export interface PlayAudioParams {
  audioId: keyof typeof Audios
}
