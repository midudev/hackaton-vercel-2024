export interface Review {
  id: string;
  score: number
  author: string;
  quote: string;
  date: string;
}

export type GameId = string

export interface Game {
  id: GameId;
  name: string;
  reviews: Review[];
  score: number
  img: string;
}
