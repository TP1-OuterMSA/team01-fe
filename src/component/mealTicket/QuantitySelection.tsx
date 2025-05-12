import { MealOption } from "../../type/meal";
interface QuantitySelectorProps {
  meal: MealOption;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
}

function QuantitySelection({
  meal,
  quantity,
  onQuantityChange,
  onAddToCart,
}: QuantitySelectorProps) {
  const decreaseQuantity = () => {
    onQuantityChange(Math.max(1, quantity - 1));
  };

  const increaseQuantity = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium text-gray-800">{meal.name}</h3>
          <p className="text-gray-600 text-sm mt-1">수량을 선택해주세요</p>
        </div>

        <div className="flex items-center">
          <button
            className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200"
            onClick={decreaseQuantity}
          >
            -
          </button>
          <div className="w-10 h-10 flex items-center justify-center font-medium">
            {quantity}
          </div>
          <button
            className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200"
            onClick={increaseQuantity}
          >
            +
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="text-gray-800">
          총{" "}
          <span className="font-semibold text-blue-600">
            {(meal.price * quantity).toLocaleString()}
          </span>
          원
        </div>
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          onClick={onAddToCart}
        >
          담기
        </button>
      </div>
    </div>
  );
}

export default QuantitySelection;
