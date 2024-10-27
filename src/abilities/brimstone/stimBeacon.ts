import Ability from '../../interfaces/Ability'

export const stimBeacon: Ability = {
  identifier: 'stimBeacon',
  usesLeft: 1,
  useRange: [1, 10],
  validBoxTypes: ['empty'],
  methods: [
    {
      type: 'add',
      params: {
        get: {
          getBy: 'squareTo'
        },
        boxType: 'stimBeacon'
      }
    },
    {
      type: 'modifyClass',
      params: {
        get: {
          getBy: 'squareTo'
        },
        method: 'add',
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
            type: 'modifyClass',
            params: {
              get: {
                getBy: 'squareTo'
              },
              method: 'remove',
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
            type: 'remove',
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
      type: 'modifyAttribute',
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
      type: 'tag',
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
            type: 'modifyAttribute',
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
      type: 'fade',
      params: {
        get: {
          getBy: 'range',
          range: 1,
          filters: {
            boxTypes: ['player'],
            team: 'currentTeam'
          }
        },
        color: 'currentTeamColor',
        duration: 1
      }
    }
  ]
}
