import { MealType } from "./chart";

export type WeatherType = "SUNNY" | "CLOUDY" | "RAINY" | "SNOWY";

export interface Weather {
  id?: number;
  date: string;
  mealType: MealType;
  people: number;
  weather: WeatherType;
}

export interface WeatherRequest {
  date: string;
  weather: WeatherType;
  mealType: MealType;
  people?: number;
}
