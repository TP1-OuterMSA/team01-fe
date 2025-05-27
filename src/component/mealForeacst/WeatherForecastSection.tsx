import MealTypeSelector from "../../chart/MealTypeSelector";
import { useActualPeople } from "../../hooks/mealForecast/useMealForecast";
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
  // const { data } = useMealForecast({
  //   date: weather.date,
  //   weather: weather.weatherStatus,
  //   mealType: mealType,
  // });

  const { data } = useActualPeople({
    date: weather.date,
    mealType: mealType,
  });

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
      <div className="flex flex-row gap-8 w-full items-center justify-center mt-8">
        <div className="w-full max-w-md bg-gradient-to-br from-white to-blue-50 flex flex-col items-center rounded-2xl p-8 shadow-lg border border-blue-200 transition-transform transform hover:scale-105">
          <span className="text-xl font-semibold text-gray-800 mb-6">
            예상 식수 인원
          </span>

          <div className="relative w-40 h-40 flex items-center justify-center bg-white rounded-full shadow-inner mb-6 border-4 border-blue-200">
            <span className="text-5xl font-bold bg-gradient-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent">
              {data?.predictPeople}
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

        <div className="w-full max-w-md bg-gradient-to-br from-white to-blue-200 flex flex-col items-center rounded-2xl p-8 shadow-lg border border-blue-200 transition-transform transform hover:scale-105">
          <span className="text-xl font-semibold text-gray-800 mb-6">
            실제 식수 인원
          </span>

          <div className="relative w-40 h-40 flex items-center justify-center bg-white rounded-full shadow-inner mb-6 border-4 border-blue-200">
            <span className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
              {data?.atePeople}
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
    </div>
  );
};

export default WeatherForecastSection;
