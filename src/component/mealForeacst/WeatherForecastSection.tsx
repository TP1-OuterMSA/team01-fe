import MealTypeSelector from "../../chart/MealTypeSelector";
import { useMealForecast } from "../../hooks/mealForecast/useMealForecast";
import { MealType } from "../../type/chart";
import { Weather } from "../../type/weather";
const WeatherForecastSection = ({
  weather,
  mealType,
  setMealType,
}: {
  weather: Weather;
  mealType: MealType;
  setMealType: (mealType: MealType) => void;
}) => {
  const { data } = useMealForecast({
    date: weather.date,
    weather: weather.weatherStatus,
    mealType: mealType,
  });

  console.log("data", data);

  const handleMealTypeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMealType: MealType | null
  ) => {
    if (!newMealType) return;
    setMealType(newMealType);
  };

  return (
    <div className="w-full flex flex-col items-center mt-2">
      <MealTypeSelector
        mealType={mealType}
        handleMealTypeChange={handleMealTypeChange}
      />

      {/* 개선된 예상 식수 인원 카드 */}
      <div className="w-full max-w-md bg-gradient-to-br from-white to-blue-50 flex flex-col items-center rounded-2xl p-8 mt-8 shadow-lg border border-blue-100 transition-all hover:shadow-xl">
        <span className="text-xl font-semibold text-gray-700 mb-6">
          예상 식수 인원
        </span>

        <div className="relative w-40 h-40 flex items-center justify-center bg-white rounded-full shadow-inner mb-6 border-4 border-blue-100">
          <span className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
            {data?.people}
          </span>
          <div className="absolute -bottom-3 bg-white px-4 py-1 rounded-full shadow-sm">
            <span className="text-lg font-medium text-gray-600">명</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
          <span className="px-3 py-1 bg-blue-100 rounded-full text-blue-600 font-medium">
            {mealType === "BREAKFAST"
              ? "아침"
              : mealType === "LUNCH"
              ? "점심"
              : "저녁"}
          </span>
          <span>기준</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecastSection;
