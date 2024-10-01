import { Language } from "../types/Language";

export const appName: string = "VALOPACK";
export const levelMultiplier: number = 1;
export const defaultLanguage: Language = "en";
export const creditsPerGameWinned: number = 1000;
export const teamColors = {
  ally: "#348ac7",
  enemy: "#b83231",
};
export const allyPositions = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: 2 },
  { x: 0, y: 3 },
  { x: 0, y: 4 },
];
export const enemyPositions = [
  { x: 6, y: 0 },
  { x: 6, y: 1 },
  { x: 6, y: 2 },
  { x: 6, y: 3 },
  { x: 6, y: 4 },
];
export const paths: { [key: string]: string } = {
  home: "/",
  shop: "/shop",
  team: "/team",
  play: "/play",
};
