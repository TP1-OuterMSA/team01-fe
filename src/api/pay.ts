import { api_instance } from "./instance";

type MealType = "BREAKFAST" | "LUNCH" | "DINNER";

interface MealTypeDTO {
  mealType: MealType;
  amount: number;
}

interface PostPay {
  infos: MealTypeDTO[];
  date: string;
}

export const postPay = async ({ date, infos }: PostPay) => {
  const response = await api_instance.post("/pay/add", {
    date,
    infos,
  });

  return response.data;
};
