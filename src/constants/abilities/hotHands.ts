import { Ability } from '../../models/Ability'

export const hotHands: Ability = {
  identifier: 'hotHands',
  useRange: [1, 3],
  uses: 1,
  index: undefined,
  validEntityTypes: ['empty', 'player', 'skySmoke', 'stimBeacon'],
  methods: [
    {
      type: 'add-entity',
      params: {
        get: {
          getBy: 'range',
          range: 1
        },
        entityType: 'fire'
      }
    },
    {
      type: 'modify-attribute',
      params: {
        get: {
          getBy: 'range',
          range: 1
        },
        attribute: 'health',
        amount: -30
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
            text: 'fire',
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
                tags: [{ text: 'fire', team: 'current-team' }]
              },
              entityTypes: ['fire']
            }
          }
        ]
      }
    }
  ]
}
