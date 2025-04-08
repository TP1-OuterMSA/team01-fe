import { ChartRecentWastesAPI, MealType } from "../type/chart";
import { api_instance } from "./instance";

interface PostWaste {
  date: string;
  amount: string;
  mealType: MealType;
}

export const postWaste = async ({ date, amount, mealType }: PostWaste) => {
  const response = await api_instance.put("/waste", {
    date,
    amount,
    mealType,
  });

  return response.data;
};

export const getRecentWaste = async ({
  mealType,
}: {
  mealType: MealType;
}): Promise<ChartRecentWastesAPI[]> => {
  const response = await api_instance.get(
    `/waste/recent?mealType=${mealType}&periods=week`
  );
  return response.data;
};
