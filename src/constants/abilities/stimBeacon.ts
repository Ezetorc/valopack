import { Ability } from '../../models/Ability'

export const stimBeacon: Ability = {
  identifier: 'stimBeacon',
  useRange: [1, 10],
  uses: 2,
  index: undefined,
  validEntityTypes: ['empty'],
  methods: [
    {
      type: 'add-entity',
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
        type: 'miliseconds',
        time: 2000,
        methods: [
          {
            type: 'remove-entity',
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
            teamSide: 'current-team'
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
            teamSide: 'current-team'
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
                getBy: 'tag',
                tags: [
                  {
                    text: 'stimBeacon',
                    team: 'current-team'
                  }
                ]
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
            teamSide: 'current-team'
          }
        },
        color: 'current-team-color',
        duration: 1
      }
    }
  ]
}
