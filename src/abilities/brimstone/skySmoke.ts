import Ability from "../../interfaces/Ability";

export const skySmoke: Ability = {
  name: "Sky Smoke",
  description: "Throw a 3x3 smoke that let pass your allies but no enemies",
  usesLeft: 1,
  range: [0, 10],
  boxTypes: ["empty", "player", "box", "stimBeacon", "skySmoke"],
  methods: [
    {
      type: "add",
      params: {
        get: {
          getType: "range",
          boxTypes: ["box", "skySmoke", "stimBeacon", "player", "empty"],
          team: "any",
          range: 2,
        },
        boxType: "skySmoke",
      },
    },
    {
      type: "affect",
      params: {
        get: {
          getType: "range",
          boxTypes: ["skySmoke"],
          team: "any",
          range: 2,
        },
        affectedCodes: ["skySmoke"],
      },
    },
    {
      type: "wait",
      params: {
        type: "turns",
        time: 3,
        methods: [
          {
            type: "remove",
            params: {
              get: {
                getType: "affected",
                affectedCodes: ["skySmoke"],
              },
            },
          },
        ],
      },
    },
  ],
};
