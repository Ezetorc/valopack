import { Method } from '../Method.ts'

export interface WaitParams {
  type: 'turns' | 'miliseconds'
  time: number
  methods: Method[]
}
