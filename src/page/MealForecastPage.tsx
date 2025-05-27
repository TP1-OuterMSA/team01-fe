import { format } from "date-fns";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import MealForecastInputDialog from "../component/dialog/MealForecastInputDialog";
import WeatherSection from "../component/mealForeacst/WearherSection";
import WeatherForecastSection from "../component/mealForeacst/WeatherForecastSection";
import { useMealForecast } from "../hooks/mealForecast/useMealForecast";
import { MealType } from "../type/chart";
import { Weather } from "../type/weather";
const MealForecastPage = () => {
  const [open, setOpen] = useState(false);
  const [mealType, setMealType] = useState<MealType>("BREAKFAST");

  const [params] = useSearchParams();
  const todayDate = params.get("date");
  const { data } = useMealForecast({
    date: todayDate ?? format(new Date(), "yyyy-MM-dd"),
    weather: "SUNNY",
    mealType: mealType,
  });

  const weather: Weather = {
    date: todayDate ?? format(new Date(), "yyyy-MM-dd"),
    mealType: mealType,
    people: 100,
    weatherStatus: data?.weatherStatus ?? "SUNNY",
  };

  return (
    <div className="font-pretendard flex flex-col items-center mt-6 mx-40 ">
      {/* <TitleHeader
        title="날씨 및 식사 예보"
        description="날씨 및 식사 예보를 확인하세요"
        buttonText="입력하기"
        onClick={() => {
          setOpen(true);
        }}
        isShowButton={true}
      /> */}
      <MealForecastInputDialog open={open} onClose={() => setOpen(false)} />
      <WeatherSection weather={weather} />
      <WeatherForecastSection
        weather={weather}
        mealType={mealType}
        setMealType={setMealType}
      />
    </div>
  );
};

export default MealForecastPage;
