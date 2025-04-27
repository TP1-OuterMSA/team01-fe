import { useState } from "react";
import { MealOption, CartItem } from "../type/meal";

export const useMealTicket = () => {
  const [selectedMeal, setSelectedMeal] = useState<MealOption | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (): void => {
    if (!selectedMeal) return;

    const newItem: CartItem = {
      ...selectedMeal,
      quantity,
      totalPrice: selectedMeal.price * quantity,
    };

    setCart([...cart, newItem]);
    setSelectedMeal(null);
    setQuantity(1);
  };

  const removeFromCart = (index: number): void => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const calculateTotal = (): number => {
    return cart.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  return {
    selectedMeal,
    setSelectedMeal,
    quantity,
    setQuantity,
    cart,
    addToCart,
    removeFromCart,
    calculateTotal,
  };
};
