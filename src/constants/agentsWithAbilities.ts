import { Agent } from '../models/Agent.ts'
import { skySmoke } from './abilities/skySmoke.ts'
import { stimBeacon } from './abilities/stimBeacon.ts'

export const agents: Readonly<Agent[]> = [
  {
    name: 'Brimstone',
    role: 'controller',
    portrait:
      'https://media.valorant-api.com/agents/9f0d8ba9-4140-b941-57d3-a7ad57c6b417/fullportrait.png',
    icon: 'https://media.valorant-api.com/agents/9f0d8ba9-4140-b941-57d3-a7ad57c6b417/displayiconsmall.png',
    id: 0,
    abilities: [stimBeacon]
  },
  {
    name: 'Phoenix',
    role: 'duelist',
    portrait:
      'https://media.valorant-api.com/agents/eb93336a-449b-9c1b-0a54-a891f7921d69/fullportrait.png',
    icon: 'https://media.valorant-api.com/agents/eb93336a-449b-9c1b-0a54-a891f7921d69/displayiconsmall.png',
    id: 1,
    abilities: [stimBeacon, skySmoke]
  },
  {
    name: 'Sage',
    role: 'sentinel',
    portrait:
      'https://media.valorant-api.com/agents/569fdd95-4d10-43ab-ca70-79becc718b46/fullportrait.png',
    icon: 'https://media.valorant-api.com/agents/569fdd95-4d10-43ab-ca70-79becc718b46/displayiconsmall.png',
    id: 2,
    abilities: [stimBeacon, skySmoke]
  },
  {
    name: 'Sova',
    role: 'initiator',
    portrait:
      'https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/fullportrait.png',
    icon: 'https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/displayiconsmall.png',
    id: 3,
    abilities: [stimBeacon, skySmoke]
  },
  {
    name: 'Viper',
    role: 'controller',
    portrait:
      'https://media.valorant-api.com/agents/707eab51-4836-f488-046a-cda6bf494859/fullportrait.png',
    icon: 'https://media.valorant-api.com/agents/707eab51-4836-f488-046a-cda6bf494859/displayiconsmall.png',
    id: 4,
    abilities: [stimBeacon, skySmoke]
  },
  {
    name: 'Cypher',
    role: 'sentinel',
    portrait:
      'https://media.valorant-api.com/agents/117ed9e3-49f3-6512-3ccf-0cada7e3823b/fullportrait.png',
    icon: 'https://media.valorant-api.com/agents/117ed9e3-49f3-6512-3ccf-0cada7e3823b/displayiconsmall.png',
    id: 5,
    abilities: [stimBeacon, skySmoke]
  },
  {
    name: 'Reyna',
    role: 'duelist',
    portrait:
      'https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/fullportrait.png',
    icon: 'https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/displayiconsmall.png',
    id: 6,
    abilities: [stimBeacon, skySmoke]
  },
  {
    name: 'Killjoy',
    role: 'sentinel',
    portrait:
      'https://media.valorant-api.com/agents/1e58de9c-4950-5125-93e9-a0aee9f98746/fullportrait.png',
    icon: 'https://media.valorant-api.com/agents/1e58de9c-4950-5125-93e9-a0aee9f98746/displayiconsmall.png',
    id: 7,
    abilities: [stimBeacon, skySmoke]
  },
  {
    name: 'Breach',
    role: 'initiator',
    portrait:
      'https://media.valorant-api.com/agents/5f8d3a7f-467b-97f3-062c-13acf203c006/fullportrait.png',
    icon: 'https://media.valorant-api.com/agents/5f8d3a7f-467b-97f3-062c-13acf203c006/displayiconsmall.png',
    id: 8,
    abilities: [stimBeacon, skySmoke]
  },
  {
    name: 'Omen',
    role: 'controller',
    portrait:
      'https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/fullportrait.png',
    icon: 'https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/displayiconsmall.png',
    id: 9,
    abilities: [stimBeacon, skySmoke]
  },
  {
    name: 'Jett',
    role: 'duelist',
    portrait:
      'https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/fullportrait.png',
    icon: 'https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/displayiconsmall.png',
    id: 10,
    abilities: [stimBeacon, skySmoke]
  },
  {
    name: 'Raze',
    role: 'duelist',
    portrait:
      'https://media.valorant-api.com/agents/f94c3b30-42be-e959-889c-5aa313dba261/fullportrait.png',
    icon: 'https://media.valorant-api.com/agents/f94c3b30-42be-e959-889c-5aa313dba261/displayiconsmall.png',
    id: 11,
    abilities: [stimBeacon, skySmoke]
  },
  {
    name: 'Skye',
    role: 'initiator',
    portrait:
      'https://media.valorant-api.com/agents/6f2a04ca-43e0-be17-7f36-b3908627744d/fullportrait.png',
    icon: 'https://media.valorant-api.com/agents/6f2a04ca-43e0-be17-7f36-b3908627744d/displayiconsmall.png',
    id: 12,
    abilities: [stimBeacon, skySmoke]
  },
  {
    name: 'Yoru',
    role: 'duelist',
    portrait:
      'https://media.valorant-api.com/agents/7f94d92c-4234-0a36-9646-3a87eb8b5c89/fullportrait.png',
    icon: 'https://media.valorant-api.com/agents/7f94d92c-4234-0a36-9646-3a87eb8b5c89/displayicon.png',
    id: 13,
    abilities: [stimBeacon, skySmoke]
  },
  {
    name: 'Astra',
    role: 'controller',
    portrait:
      'https://media.valorant-api.com/agents/41fb69c1-4189-7b37-f117-bcaf1e96f1bf/fullportrait.png',
    icon: 'https://media.valorant-api.com/agents/41fb69c1-4189-7b37-f117-bcaf1e96f1bf/displayiconsmall.png',
    id: 14,
    abilities: [stimBeacon, skySmoke]
  },
  {
    name: 'KAY/O',
    role: 'initiator',
    portrait:
      'https://media.valorant-api.com/agents/601dbbe7-43ce-be57-2a40-4abd24953621/fullportrait.png',
    icon: 'https://media.valorant-api.com/agents/601dbbe7-43ce-be57-2a40-4abd24953621/displayiconsmall.png',
    id: 15,
    abilities: [stimBeacon, skySmoke]
  },
  {
    name: 'Chamber',
    role: 'sentinel',
    portrait:
      'https://media.valorant-api.com/agents/22697a3d-45bf-8dd7-4fec-84a9e28c69d7/fullportrait.png',
    icon: 'https://media.valorant-api.com/agents/22697a3d-45bf-8dd7-4fec-84a9e28c69d7/displayiconsmall.png',
    id: 16,
    abilities: [stimBeacon, skySmoke]
  },
  {
    name: 'Neon',
    role: 'duelist',
    portrait:
      'https://media.valorant-api.com/agents/bb2a4828-46eb-8cd1-e765-15848195d751/fullportrait.png',
    icon: 'https://media.valorant-api.com/agents/bb2a4828-46eb-8cd1-e765-15848195d751/displayiconsmall.png',
    id: 17,
    abilities: [stimBeacon, skySmoke]
  },
  {
    name: 'Fade',
    role: 'initiator',
    portrait:
      'https://media.valorant-api.com/agents/dade69b4-4f5a-8528-247b-219e5a1facd6/fullportrait.png',
    icon: 'https://media.valorant-api.com/agents/dade69b4-4f5a-8528-247b-219e5a1facd6/displayiconsmall.png',
    id: 18,
    abilities: [stimBeacon, skySmoke]
  },
  {
    name: 'Harbor',
    role: 'controller',
    portrait:
      'https://media.valorant-api.com/agents/95b78ed7-4637-86d9-7e41-71ba8c293152/fullportrait.png',
    icon: 'https://media.valorant-api.com/agents/95b78ed7-4637-86d9-7e41-71ba8c293152/displayiconsmall.png',
    id: 19,
    abilities: [stimBeacon, skySmoke]
  },
  {
    name: 'Gekko',
    role: 'initiator',
    portrait:
      'https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/fullportrait.png',
    icon: 'https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/displayiconsmall.png',
    id: 20,
    abilities: [stimBeacon, skySmoke]
  },
  {
    name: 'Deadlock',
    role: 'sentinel',
    portrait:
      'https://media.valorant-api.com/agents/cc8b64c8-4b25-4ff9-6e7f-37b4da43d235/fullportrait.png',
    icon: 'https://media.valorant-api.com/agents/cc8b64c8-4b25-4ff9-6e7f-37b4da43d235/displayiconsmall.png',
    id: 21,
    abilities: [stimBeacon, skySmoke]
  },
  {
    name: 'Iso',
    role: 'duelist',
    portrait:
      'https://media.valorant-api.com/agents/0e38b510-41a8-5780-5e8f-568b2a4f2d6c/fullportrait.png',
    icon: 'https://media.valorant-api.com/agents/0e38b510-41a8-5780-5e8f-568b2a4f2d6c/displayiconsmall.png',
    id: 22,
    abilities: [stimBeacon, skySmoke]
  },
  {
    name: 'Vyze',
    role: 'sentinel',
    portrait:
      'https://media.valorant-api.com/agents/efba5359-4016-a1e5-7626-b1ae76895940/fullportrait.png',
    icon: 'https://media.valorant-api.com/agents/efba5359-4016-a1e5-7626-b1ae76895940/displayiconsmall.png',
    id: 23,
    abilities: [stimBeacon, skySmoke]
  },
  {
    name: 'Clove',
    role: 'controller',
    portrait:
      'https://media.valorant-api.com/agents/1dbf2edd-4729-0984-3115-daa5eed44993/fullportrait.png',
    icon: 'https://media.valorant-api.com/agents/1dbf2edd-4729-0984-3115-daa5eed44993/displayiconsmall.png',
    id: 24,
    abilities: [stimBeacon, skySmoke]
  }
]
