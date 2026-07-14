export type StatIcon = "players" | "countries" | "transfers" | "experience";

export interface Stat {
  value: string;
  label: string;
  icon: StatIcon;
}
