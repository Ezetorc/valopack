import Ability from '../../interfaces/Ability'

export const stimBeacon: Ability = {
  identifier: 'stimBeacon',
  usesLeft: 1,
  useRange: [1, 10],
  validBoxTypes: ['empty'],
  methods: [
    {
      type: 'add-box',
      params: {
        get: {
          getBy: 'squareTo'
        },
        boxType: 'stimBeacon'
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
              boxTypes: ['stimBeacon']
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
            boxTypes: ['player'],
            team: 'currentTeam'
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
            boxTypes: ['player'],
            team: 'currentTeam'
          }
        },
        tags: [
          {
            text: 'stimBeacon',
            useID: true
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
                    useID: true
                  }
                ]
              },
              attribute: 'speed',
              amount: -1
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
            boxTypes: ['player'],
            team: 'currentTeam'
          }
        },
        color: 'current-team-color',
        duration: 1
      }
    }
  ]
}
