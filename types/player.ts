export interface Player {
  id: string;
  name: string;
  position: string;
  club: string;
  country: string;
  city?: string;
  age: number;
  birthDate?: string;
  height: number;
  weight: number;
  preferredFoot?: string;
  image: string;
  slug: string;
  summary: string;
  highlights: string[];
}
