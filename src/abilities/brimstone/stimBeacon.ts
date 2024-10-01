import Ability from "../../interfaces/Ability";

export const stimBeacon: Ability = {
  name: "Stim Beacon",
  description:
    "Throw a stim beacon that increase speed by one of allies around it for two turns.",
  usesLeft: 1,
  range: [1, 10],
  boxTypes: ["empty"],
  methods: [
    {
      type: "replace",
      params: {
        get: {
          getType: "targetBox",
          boxTypes: ["empty"],
        },
        to: "stimBeacon",
      },
    },
    {
      type: "modifyAttribute",
      params: {
        get: {
          getType: "range",
          boxTypes: ["player"],
          team: "ally",
          range: 2,
        },
        attribute: "speed",
        amount: +1,
      },
    },
    {
      type: "affect",
      params: {
        get: {
          getType: "range",
          boxTypes: ["player"],
          team: "ally",
          range: 2,
        },
        affectedCodes: ["stimBeacon"],
      },
    },
    {
      type: "wait",
      params: {
        type: "miliseconds",
        time: 1000,
        methods: [
          {
            type: "replace",
            params: {
              get: {
                getType: "targetBox",
                boxTypes: ["stimBeacon"],
              },
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
        time: 3,
        methods: [
          {
            type: "modifyAttribute",
            params: {
              get: {
                getType: "affected",
                affectedCodes: ["stimBeacon"],
              },
              attribute: "speed",
              amount: -1,
            },
          },
        ],
      },
    },
  ],
};
