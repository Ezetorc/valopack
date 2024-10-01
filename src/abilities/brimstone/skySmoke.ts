import Ability from "../../interfaces/Ability";

export const skySmoke: Ability = {
  name: "Sky Smoke",
  description: "Throw a 3x3 smoke that let pass your allies but no enemies",
  usesLeft: 1,
  range: [0, 10],
  boxTypes: ["empty"],
  methods: [
    {
      type: "replace",
      params: {
        get: {
          getType: "range",
          boxTypes: ["empty", "player", "smoke", "stimBeacon"],
          team: "any",
          range: 2,
        },
        to: "smoke",
      },
    },
  ],
};
