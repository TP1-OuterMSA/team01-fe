import { Weather } from "../../type/weather";

const WeatherSection = ({ weather }: { weather: Weather }) => {
  const weatherIcons = {
    SUNNY: "☀️",
    CLOUDY: "☁️",
    RAINY: "🌧️",
    SNOWY: "❄️",
  };

  const weatherInfo = {
    SUNNY: "맑음",
    CLOUDY: "흐림",
    RAINY: "비",
    SNOWY: "눈",
  };

  const today = new Date(weather.date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-blue-400 to-sky-300 transition-all hover:shadow-xl">
      <div className="px-8 py-6 flex items-center">
        {/* 날씨 아이콘 섹션 */}
        <div className="bg-white bg-opacity-30 rounded-full p-5 mr-6 backdrop-blur-sm">
          <div className="text-6xl">{weatherIcons[weather.weatherStatus]}</div>
        </div>

        {/* 날씨 정보 섹션 */}
        <div className="flex flex-col text-white">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl font-bold">
              {weatherInfo[weather.weatherStatus]}
            </h2>
          </div>

          {/* 날짜 표시 */}
          <div className="text-white text-opacity-90 font-medium">{today}</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherSection;
