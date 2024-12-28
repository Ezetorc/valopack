import { Ability } from '../../models/Ability'

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
        time: 500,
        type: 'miliseconds',
        methods: [
          {
            type: 'show-flash',
            params: {
              startColor: '#FA5902',
              endColor: '#DC3333',
              duration: 2000
            }
          },
          {
            type: 'modify-attribute',
            params: {
              get: {
                getBy: 'range',
                range: 3,
                filters: {
                  entityTypes: ['player'],
                  teamSide: 'opposite-team'
                }
              },
              attribute: 'critic',
              amount: -25
            }
          },
          {
            type: 'modify-attribute',
            params: {
              get: {
                getBy: 'range',
                range: 3,
                filters: {
                  entityTypes: ['player'],
                  teamSide: 'opposite-team'
                }
              },
              attribute: 'defense',
              amount: -20
            }
          },
          {
            type: 'modify-attribute',
            params: {
              get: {
                getBy: 'range',
                range: 3,
                filters: {
                  entityTypes: ['player'],
                  teamSide: 'opposite-team'
                }
              },
              attribute: 'precision',
              amount: -25
            }
          }
        ]
      }
    }
  ]
}
