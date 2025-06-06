import { postPay } from "../api/pay";

interface CartItem {
  id: number;
  name: string;
  price: number;
  icon: string;
  quantity: number;
  totalPrice: number;
}

type CartItems = CartItem[];

const usePay = async (items: CartItems) => {
  const infos: any[] = [];
  items.forEach((item) => {
    infos.push({
      mealType: matchMealType(item).mealType,
      amount: item.quantity,
    });
  });

  const date = new Date().toISOString().slice(0, 10);

  const response = await postPay({
    date,
    infos,
  });

  console.log(response);

  return response;
};

export default usePay;

const matchMealType = (item: CartItem) => {
  const MealType = {
    "학생식당 중식": "LUNCH",
    "학생식당 석식": "DINNER",
    "학생식당 조식": "BREAKFAST",
  };

  return {
    mealType: MealType[item.name as keyof typeof MealType],
    amount: item.totalPrice,
  };
};
