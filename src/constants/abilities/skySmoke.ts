import { Ability } from '../../pages/Play/models/Ability'

export const skySmoke: Ability = {
  identifier: 'skySmoke',
  useRange: [1, 10],
  uses: 1,
  index: undefined,
  validEntityTypes: ['empty'],
  methods: [
    {
      type: 'add-entity',
      params: {
        get: {
          getBy: 'range',
          range: 1
        },
        entityType: 'skySmoke',
        position: 'forward'
      }
    },
    {
      type: 'add-tag',
      params: {
        get: {
          getBy: 'range',
          range: 1
        },
        tags: [
          {
            text: 'skySmoke',
            team: 'current-team'
          }
        ]
      }
    },
    {
      type: 'add-class',
      params: {
        get: {
          getBy: 'squareTo'
        },
        classNames: ['animate-scale_up']
      }
    },
    {
      type: 'wait',
      params: {
        type: 'miliseconds',
        time: 500,
        methods: [
          {
            type: 'remove-class',
            params: {
              get: {
                getBy: 'squareTo'
              },
              classNames: ['animate-scale_up']
            }
          }
        ]
      }
    },
    {
      type: 'wait',
      params: {
        type: 'turns',
        time: 4,
        methods: [
          {
            type: 'remove-entity',
            params: {
              get: {
                getBy: 'tag',
                tags: [{ text: 'skySmoke', team: 'current-team' }]
              },
              entityTypes: ['skySmoke']
            }
          }
        ]
      }
    }
  ]
}
