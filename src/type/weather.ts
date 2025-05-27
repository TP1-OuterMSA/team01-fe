import { MealType } from "./chart";

export type WeatherType = "SUNNY" | "CLOUDY" | "RAINY" | "SNOWY";

export interface Weather {
  id?: number;
  date: string;
  mealType: MealType;
  people: number;
  weatherStatus: WeatherType;
}

export interface WeatherRequest {
  date: string;
  weather: WeatherType;
  mealType: MealType;
  people?: number;
}

export interface ActualPeople {
  date: string;
  mealType: MealType;
}

export interface ActualPeopleResponse {
  date: string;
  mealType: MealType;
  predictPeople: number;
  atePeople: number;
  weatherStatus: WeatherType;
  description: string;
}
