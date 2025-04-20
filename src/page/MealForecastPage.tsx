import { useState } from "react";
import TitleHeader from "../component/common/TitleHeader";
import MealForecastInputDialog from "../component/dialog/MealForecastInputDialog";
import WeatherSection from "../component/mealForeacst/WearherSection";
import WeatherForecastSection from "../component/mealForeacst/WeatherForecastSection";
import { Weather, WeatherType } from "../type/weather";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";
const MealForecastPage = () => {
  const [open, setOpen] = useState(false);
  const [params] = useSearchParams();
  const todayDate = params.get("date");

  const weather: Weather = {
    date: todayDate ?? format(new Date(), "yyyy-MM-dd"),
    mealType: "BREAKFAST",
    people: 100,
    weather: (params.get("weather") as WeatherType) ?? "SUNNY",
  };
  console.log(weather);
  return (
    <div className="font-pretendard flex flex-col items-center mt-6 mx-40 ">
      <TitleHeader
        title="날씨 및 식사 예보"
        description="날씨 및 식사 예보를 확인하세요"
        buttonText="입력하기"
        onClick={() => {
          setOpen(true);
        }}
        isShowButton={true}
      />
      <MealForecastInputDialog open={open} onClose={() => setOpen(false)} />
      <WeatherSection weather={weather} />
      <WeatherForecastSection weather={weather} />
    </div>
  );
};

export default MealForecastPage;
