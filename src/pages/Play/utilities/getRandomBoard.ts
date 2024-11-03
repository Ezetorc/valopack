import { getRandomElements } from "../../../utilities/getRandomElements";
import { boards } from "../constants/boards";
import { Board } from "../models/Board";

export function getRandomBoard (): Board {
  return getRandomElements(Object.values(boards))[0]
}
