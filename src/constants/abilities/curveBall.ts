import { Ability } from '../../pages/Play/models/Ability'

export const curveBall: Ability = {
  identifier: 'curveBall',
  useRange: [1, 3],
  uses: 2,
  index: undefined,
  validEntityTypes: 'all',
  methods: [
    {
      type: 'play-audio',
      params: {
        audioId: 'curveball-throw'
      }
    },
    {
      type: 'wait',
      params: {
        time: 1000,
        type: 'miliseconds',
        methods: []
      }
    }
  ]
}
