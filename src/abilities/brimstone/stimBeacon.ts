import Ability from '../../interfaces/Ability'

export const stimBeacon: Ability = {
  identifier: 'stimBeacon',
  usesLeft: 1,
  range: [1, 10],
  boxTypes: ['empty'],
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
            team: 'ally'
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
            team: 'ally'
          }
        },
        tags: ['stimBeacon']
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
                filters: {
                  tags: ['stimBeacon']
                }
              },
              attribute: 'speed',
              amount: -1
            }
          }
        ]
      }
    }
  ]
}
