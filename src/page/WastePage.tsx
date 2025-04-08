import { useState } from "react";
import MealWasteChart from "../chart/MealWasteChart";
import TitleHeader from "../component/common/TitleHeader";
import WasteInputDialog from "../component/dialog/WasteInputDialog";

const WastePage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-30 h-screen font-pretendard flex flex-col items-center justify-center">
      <TitleHeader
        title="음식물 쓰레기 배출량 입력"
        buttonText="입력하기"
        onClick={() => setOpen(true)}
        isShowButton={true}
      />
      <WasteInputDialog open={open} onClose={() => setOpen(false)} />
      <MealWasteChart />
    </div>
  );
};

export default WastePage;
