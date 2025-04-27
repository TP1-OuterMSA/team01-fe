export interface MealOption {
  id: number;
  name: string;
  price: number;
  icon: string;
}

export interface CartItem extends MealOption {
  quantity: number;
  totalPrice: number;
}
