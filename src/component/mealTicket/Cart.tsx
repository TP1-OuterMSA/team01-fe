import { useNavigate } from "react-router-dom";
import { CartItem } from "../../type/meal";
interface CartProps {
  items: CartItem[];
  onRemoveItem: (index: number) => void;
  total: number;
}

function Cart({ items, onRemoveItem, total }: CartProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-lg font-medium text-gray-800 mb-4">장바구니</h2>

      {items.length === 0 ? (
        <div className="text-center py-8 ">
          <p className="text-gray-500">장바구니가 비어있습니다</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {items.map((item, index) => (
              <div
                key={index}
                className={`flex justify-between py-2 pb-4 ${
                  index === items.length - 1 ? "" : "border-b border-gray-100"
                }`}
              >
                <div>
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.quantity}개</p>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-800 mr-4">
                    {item.totalPrice.toLocaleString()}원
                  </span>
                  <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => onRemoveItem(index)}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between mb-6">
              <span className="font-semibold text-gray-800">총 결제금액</span>
              <span className="font-semibold text-blue-600">
                {total.toLocaleString()}원
              </span>
            </div>

            <button
              onClick={() => {
                navigate(`/team1/pay?value=${total}`);
              }}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              결제하기
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
