import { Weather, WeatherRequest } from "../type/weather";
import { api_instance } from "./instance";

// 예상 식수 인원 입력
export const postPeople = async ({
  date,
  weather,
  mealType,
  people,
}: WeatherRequest) => {
  const response = await api_instance.put("/people", {
    date,
    weather,
    mealType,
    people,
  });

  return response.data;
};

// 예상 식수 인원 조회
export const getPredict = async ({
  date,
  weather,
  mealType,
}: WeatherRequest): Promise<Weather> => {
  const response = await api_instance.get(
    `/people/predict?date=${date}&mealType=${mealType}&weather=${weather}`
  );
  return response.data;
};
