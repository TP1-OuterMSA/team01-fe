import {
  loadTossPayments,
  TossPaymentsWidgets,
} from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = generateRandomString();

function PayPage() {
  const [params] = useSearchParams();

  const [amount] = useState({
    currency: "KRW",
    value: Number(params.get("value"))!,
  });

  const [items] = useState(JSON.parse(params.get("items")!));
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);

  useEffect(() => {
    async function fetchPaymentWidgets() {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const widgets = tossPayments.widgets({
          customerKey,
        });
        setWidgets(widgets);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    }

    fetchPaymentWidgets();
  }, [clientKey, customerKey]);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets === null) {
        return;
      }
      await widgets.setAmount(amount);

      await Promise.all([
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets]);

  return (
    <div className="wrapper">
      <div className="box_section">
        {/* Payment Amount Display */}
        <div className="bg-white p-4 mb-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 text-center">
            결제 정보
          </h2>
          <div className="flex justify-between items-center border-b border-gray-200 pb-4">
            <span className="text-gray-700">상품명</span>
            <span className="font-medium">명지대 식권</span>
          </div>
          <div className="flex justify-between items-center pt-4">
            <span className="text-gray-700">결제 금액</span>
            <span className="text-xl font-bold text-blue-600">
              {amount.value.toLocaleString()}원
            </span>
          </div>
        </div>

        <div id="payment-method" />
        <div id="agreement" />
        <button
          className="button"
          style={{ marginTop: "30px" }}
          disabled={!ready}
          onClick={async () => {
            try {
              await widgets!.requestPayment({
                orderId: generateRandomString(), // 고유 주문 번호
                orderName: "명지대 식권",
                successUrl:
                  window.location.origin +
                  "/team1/pay/success?items=" +
                  JSON.stringify(items),
                failUrl: window.location.origin + "/team1/pay/fail",
                customerEmail: "customer123@gmail.com",
                customerName: "김토스",
              });
            } catch (error) {
              console.error(error);
            }
          }}
        >
          결제하기
        </button>
      </div>
    </div>
  );
}

function generateRandomString() {
  return window.btoa(Math.random().toString()).slice(0, 20);
}

export default PayPage;
