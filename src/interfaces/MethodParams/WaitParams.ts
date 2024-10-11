import Method from '../Method'

export default interface WaitParams {
  type: 'turns' | 'miliseconds'
  time: number
  methods: Method[]
}
