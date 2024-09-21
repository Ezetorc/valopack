import Method from "./Method";

export default interface Ability {
  name: string;
  description: string;
  available: boolean;
  range: [number, number];
  methods: Method[];
}


