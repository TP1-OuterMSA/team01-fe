import React, { useState } from "react";
import { MealOption, CartItem } from "../type/meal";
import { mealOptions } from "../constants/mealOption";
import MealTicketHeader from "../component/mealTicket/MealTicketHeader";
import MealSelection from "../component/mealTicket/MealSelection";
import QuantitySelection from "../component/mealTicket/QuantitySelection";
import Cart from "../component/mealTicket/Cart";
import Info from "../component/mealTicket/Info";

const MealTicket: React.FC = () => {
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

  return (
    <div className="bg-blue-50 min-h-screen">
      <div className="max-w-3xl mx-auto pt-12 pb-20 px-6">
        <MealTicketHeader
          title="명지대학교 식권 구매"
          subTitle="인문캠퍼스 식권을 간편하게 구매하고 모바일로 이용하세요"
        />
        <MealSelection
          mealOptions={mealOptions}
          selectedMeal={selectedMeal}
          onSelectMeal={setSelectedMeal}
        />
        {selectedMeal && (
          <QuantitySelection
            meal={selectedMeal}
            quantity={quantity}
            onQuantityChange={setQuantity}
            onAddToCart={addToCart}
          />
        )}
        <Cart
          items={cart}
          onRemoveItem={removeFromCart}
          total={calculateTotal()}
        />
        <Info />
      </div>
    </div>
  );
};

export default MealTicket;
