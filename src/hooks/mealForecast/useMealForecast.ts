import { useEffect, useState } from "react";
import { getActualPeople, getPredict } from "../../api/weather";
import {
  ActualPeople,
  ActualPeopleResponse,
  Weather,
  WeatherRequest,
} from "../../type/weather";
export function useMealForecast({ date, weather, mealType }: WeatherRequest) {
  const [data, setData] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMealForecast = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getPredict({ date, weather, mealType });
        setData(data);
      } catch (err) {
        console.error("Failed to fetch waste data:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchMealForecast();
  }, [date, weather, mealType]);

  return { data, loading, error };
}

export function useActualPeople({ date, mealType }: ActualPeople) {
  const [data, setData] = useState<ActualPeopleResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchActualPeople = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getActualPeople({ date, mealType });
        setData(data);
      } catch (err) {
        console.error("Failed to fetch waste data:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchActualPeople();
  }, [date, mealType]);

  return { data, loading, error };
}
