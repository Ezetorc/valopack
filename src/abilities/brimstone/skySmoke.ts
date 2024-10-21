import Ability from '../../interfaces/Ability'

export const skySmoke: Ability = {
  identifier: "skySmoke",
  usesLeft: 1,
  range: [0, 10],
  boxTypes: ['empty', 'player', 'box', 'stimBeacon', 'skySmoke'],
  methods: [
    // {
    //   type: 'add',
    //   params: {
    //     get: {
    //       getBy: 'range',
    //       boxTypes: ['box', 'skySmoke', 'stimBeacon', 'player', 'empty'],
    //       team: 'any',
    //       range: 1
    //     },
    //     boxType: 'skySmoke'
    //   }
    // },
    // {
    //   type: 'tag',
    //   params: {
    //     get: {
    //       getBy: 'range',
    //       boxTypes: ['skySmoke'],
    //       team: 'any',
    //       range: 2
    //     },
    //     tags: ['skySmoke']
    //   }
    // },
    // {
    //   type: 'wait',
    //   params: {
    //     type: 'turns',
    //     time: 3,
    //     methods: [
    //       {
    //         type: 'remove',
    //         params: {
    //           get: {
    //             getBy: 'tag',
    //             tags: ['skySmoke'],
    //             team: 'any',
    //             range: 1
    //           }
    //         }
    //       }
    //     ]
    //   }
    // }
  ]
}
