import Ability from "../../interfaces/Ability";

export const stimBeacon: Ability = {
  name: "Stim Beacon",
  description:
    "Throw a stim beacon that increase speed by one of allies around it for two turns.",
  available: true,
  range: [1, 10],
  methods: [
    {
      type: "replace",
      params: {
        get: {
          getType: "targetBox",
        },
        from: ["empty"],
        to: "stimBeacon",
      },
    },
    {
      type: "modifyAttribute",
      params: {
        get: {
          getType: "range",
          boxType: "player",
          team: "ally",
          range: 2,
        },
        attribute: "speed",
        amount: +1,
      },
    },
    {
      type: "wait",
      params: {
        type: "miliseconds",
        time: 2000,
        methods: [
          {
            type: "replace",
            params: {
              get: {
                getType: "targetBox",
              },
              from: ["stimBeacon"],
              to: "empty",
            },
          },
        ],
      },
    },
    {
      type: "wait",
      params: {
        type: "turns",
        time: 2,
        methods: [
          {
            type: "replace",
            params: {
              get: {
                getType: "targetBox",
              },
              from: ["stimBeacon", "player", "box", "empty"],
              to: "box",
            },
          },
        ],
      },
    },
  ],
};
