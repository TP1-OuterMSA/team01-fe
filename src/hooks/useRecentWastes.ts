import { useEffect, useState } from "react";
import { ChartDataPoint, MealType } from "../type/chart";
import { getRecentWaste } from "../api/waste";

export function useRecentWastes(mealType: MealType) {
  const [chartData, setChartData] = useState<ChartDataPoint | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRecentWaste = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getRecentWaste({ mealType });

        const processedData = {
          dates: data.map((item) => new Date(item.date)),
          amounts: data.map((item) => Number(item.amount)),
        };

        setChartData(processedData);
      } catch (err) {
        console.error("Failed to fetch waste data:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchRecentWaste();
  }, [mealType]);

  return { chartData, loading, error };
}
