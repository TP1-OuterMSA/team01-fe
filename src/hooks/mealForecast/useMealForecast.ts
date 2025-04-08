import { useEffect, useState } from "react";
import { getPredict } from "../../api/weather";
import { Weather, WeatherRequest } from "../../type/weather";
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
