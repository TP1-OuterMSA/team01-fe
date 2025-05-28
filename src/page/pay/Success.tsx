import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { useSearchParams } from "react-router-dom";
import usePay from "../../hooks/usePay";
function Success() {
  const [searchParams] = useSearchParams();
  const [qrValue, setQrValue] = useState("");
  const qrRef = useRef(null);

  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const items = searchParams.get("items");

  useEffect(() => {
    const qrData = {
      type: "meal_ticket",
      orderId: orderId,
      amount: amount,
      timestamp: new Date().toISOString(),
      ticketId: `TICKET-${orderId}-${Date.now()}`,
    };
    setQrValue(JSON.stringify(qrData));

    // 결제 로그 전송
    usePay(JSON.parse(items!));
    // 카카오 SDK 초기화
    if (!(window as any).Kakao.isInitialized()) {
      (window as any).Kakao.init(import.meta.env.VITE_KAKAO_APP_KEY);
    }
  }, [orderId, amount]);

  const shareOnKakao = () => {
    if (!qrRef.current) return;
    const svg = (qrRef.current as HTMLElement).querySelector("svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const image = new Image();
    image.src = url;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d");
      if (!context) return;
      context.drawImage(image, 0, 0);

      const imageData = canvas.toDataURL("image/png");
      // 카카오톡 공유하기
      (window as any).Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "QR 코드 공유",
          description: "이 QR 코드를 사용하여 메뉴를 받을 수 있습니다.",
          imageUrl: imageData, // 이미지 데이터 URL
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      });
    };
  };

  return (
    <>
      <div
        className="box_section"
        style={{
          width: "600px",
          margin: "0 auto",
          textAlign: "center",
          padding: "30px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        }}
      >
        <img
          width="100px"
          src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
          alt="결제 완료"
          style={{ marginBottom: "20px" }}
        />
        <h2>결제를 완료했어요</h2>
        <div
          className="p-grid typography--p"
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="p-grid-col text--left">
            <b>결제금액</b>
          </div>
          <div className="p-grid-col text--right" id="amount">
            {`${Number(amount).toLocaleString()}원`}
          </div>
        </div>
        <div
          className="p-grid typography--p"
          style={{
            marginTop: "10px",
            marginBottom: "30px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="p-grid-col text--left">
            <b>주문번호</b>
          </div>
          <div className="p-grid-col text--right" id="orderId">
            {orderId}
          </div>
        </div>

        <div style={{ marginTop: "20px", marginBottom: "15px" }}>
          <h3>식권 QR 코드</h3>
          <p style={{ fontSize: "14px", color: "#666", marginBottom: "20px" }}>
            아래 QR 코드를 매장에 제시하면 메뉴를 받을 수 있습니다
          </p>
        </div>

        {/* QR 코드 표시 */}
        <div
          ref={qrRef}
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <QRCode
            value={qrValue}
            size={200}
            level="H" // 오류 수정 레벨 (L, M, Q, H)
            bgColor="#FFFFFF"
            fgColor="#000000"
          />
        </div>

        {/* 사용 방법 설명 */}
        <div
          style={{
            fontSize: "14px",
            backgroundColor: "#f8f9fa",
            padding: "15px",
            borderRadius: "8px",
            textAlign: "left",
          }}
        >
          <p style={{ margin: "0 0 8px 0", fontWeight: "bold" }}>
            🍽️ 사용 방법
          </p>
          <ol style={{ margin: "0", paddingLeft: "20px" }}>
            <li>매장 카운터에 방문하세요</li>
            <li>QR 코드를 직원에게 보여주세요</li>
            <li>식권이 확인되면 메뉴를 받으실 수 있습니다</li>
          </ol>
        </div>
        <button
          className="mt-6 w-full bg-[#FEE500] cursor-pointer text-[#000000] py-3 px-6 rounded-lg font-medium hover:bg-[#FDD835] transition duration-200 flex items-center justify-center gap-2"
          onClick={shareOnKakao}
        >
          <img
            src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png"
            alt="카카오톡 로고"
            className="w-5 h-5"
          />
          카카오톡으로 공유하기
        </button>
      </div>
    </>
  );
}

export default Success;
