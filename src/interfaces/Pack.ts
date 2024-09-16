import { Filter } from "../types/Filter";

export default interface Pack {
  type: Filter;
  name: string;
  price: number;
  image: string;
}
