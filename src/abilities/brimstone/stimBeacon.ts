import Ability from '../../interfaces/Ability'

export const stimBeacon: Ability = {
  name: 'Stim Beacon',
  description:
    'Throw a stim beacon that increase speed by one of allies around it for two turns.',
  usesLeft: 1,
  range: [1, 10],
  boxTypes: ['empty'],
  methods: [
    {
      type: 'add',
      params: {
        get: {
          getBy: 'targetBox',
          boxTypes: ['empty'],
          range: 1,
          team: 'any',
          tags: []
        },
        boxType: 'stimBeacon'
      }
    },
    {
      // Este método, el get, se ejecuta 3 veces en caso de detectar 3 agentes.
      // Esto es lo que provoca que se sume 3 a la speed en vez de 1.
      // ¿Tienes idea de por qué pasa esto?
      type: 'modifyAttribute',
      params: {
        get: {
          getBy: 'range',
          boxTypes: ['player'],
          team: 'ally',
          range: 1
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
          boxTypes: ['player'],
          team: 'ally',
          range: 1
        },
        tags: ['stimBeacon']
      }
    },
    {
      type: 'wait',
      params: {
        type: 'miliseconds',
        time: 1000,
        methods: [
          {
            type: 'remove',
            params: {
              get: {
                getBy: 'targetBox',
                boxTypes: ['stimBeacon'],
                range: 1,
                team: 'any',
                tags: []
              }
            }
          }
        ]
      }
    },
    {
      type: 'wait',
      params: {
        type: 'turns',
        time: 3,
        methods: [
          {
            type: 'modifyAttribute',
            params: {
              get: {
                getBy: 'tag',
                tags: ['stimBeacon'],
                range: 1,
                team: 'ally',
                boxTypes: []
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
