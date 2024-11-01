import {Method} from '../Method'

export interface WaitParams {
  type: 'turns' | 'miliseconds'
  time: number
  methods: Method[]
}
