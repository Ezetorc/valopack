import { Ability } from '../../pages/Play/models/Ability'

export const skySmoke: Ability = {
  identifier: 'skySmoke',
  useRange: [1, 10],
  uses: 1,
  index: undefined,
  validEntityTypes: ["empty"],
  methods: [
    {
      type: 'add-box',
      params: {
        get: {
          getBy: 'squareTo'
        },
        entityType: 'stimBeacon'
      }
    },
    {
      type: 'add-class',
      params: {
        get: {
          getBy: 'squareTo'
        },
        classNames: ['scale-up']
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
              classNames: ['scale-up']
            }
          }
        ]
      }
    },
    {
      type: 'wait',
      params: {
        type: 'miliseconds',
        time: 2000,
        methods: [
          {
            type: 'remove-box',
            params: {
              get: {
                getBy: 'squareTo'
              },
              entityTypes: ['stimBeacon']
            }
          }
        ]
      }
    },
    {
      type: 'modify-attribute',
      params: {
        get: {
          getBy: 'range',
          range: 1,
          filters: {
            entityTypes: ['player'],
            team: 'current-team'
          }
        },
        attribute: 'speed',
        amount: +1
      }
    },
    {
      type: 'add-tag',
      params: {
        get: {
          getBy: 'range',
          range: 1,
          filters: {
            entityTypes: ['player'],
            team: 'current-team'
          }
        },
        tags: [
          {
            text: 'stimBeacon',
            team: 'current-team'
          }
        ]
      }
    },
    {
      type: 'wait',
      params: {
        type: 'turns',
        time: 2,
        methods: [
          {
            type: 'modify-attribute',
            params: {
              get: {
                getBy: 'tag',
                tags: [
                  {
                    text: 'stimBeacon',
                    team: 'current-team'
                  }
                ]
              },
              attribute: 'speed',
              amount: -1
            }
          },
          {
            type: 'remove-tag',
            params: {
              get: {
                getBy: 'range',
                range: 1,
                filters: {
                  entityTypes: ['player'],
                  team: 'current-team'
                }
              },
              tags: [{ text: 'stimBeacon', team: 'current-team' }]
            }
          }
        ]
      }
    },
    {
      type: 'show-fade',
      params: {
        get: {
          getBy: 'range',
          range: 1,
          filters: {
            entityTypes: ['player'],
            team: 'current-team'
          }
        },
        color: 'current-team-color',
        duration: 1
      }
    }
  ]
}
