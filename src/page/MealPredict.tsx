import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useEvent from "../hooks/useEvent";
import { EventAPI } from "../type/event";

interface WeatherData {
  date: string;
  condition: string;
  icon: string;
  temperature: number;
  precipitation: number;
}

interface MealPrediction {
  date: string;
  breakfast: number;
  lunch: number;
  dinner: number;
  totalStudents: number;
  weather: string;
  temperature: number;
  events: string[];
}

const MealPredict: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedMeal, setSelectedMeal] = useState<string>("all");
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [events, setEvents] = useState<EventAPI[]>([]);
  const [predictions, setPredictions] = useState<MealPrediction[]>([]);

  // Generate dates for next 5 days
  const getDates = () => {
    const dates: string[] = [];
    const today = new Date();

    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  // Mock data initialization
  useEffect(() => {
    // Mock weather data
    const mockWeather: WeatherData[] = getDates().map((date) => ({
      date,
      condition: ["맑음", "흐림", "비", "구름조금", "맑음"][
        Math.floor(Math.random() * 5)
      ],
      icon: ["☀️", "☁️", "🌧️", "⛅", "☀️"][Math.floor(Math.random() * 5)],
      temperature: Math.floor(Math.random() * 15) + 15, // 15-30 degrees
      precipitation: Math.floor(Math.random() * 80), // 0-80%
    }));

    // Fetch events data using useEvent hook
    const fetchData = async () => {
      const mockEvents = await useEvent();
      return mockEvents;
    };

    fetchData().then((mockEvents) => {
      // Generate predictions based on weather and events
      const mockPredictions: MealPrediction[] = getDates().map((date) => {
        const weather = mockWeather.find((w) => w.date === date);
        const dayEvents = mockEvents.filter((e) => e.date === date);

        // Base numbers
        let baseBreakfast = 200 + Math.floor(Math.random() * 100);
        let baseLunch = 500 + Math.floor(Math.random() * 200);
        let baseDinner = 300 + Math.floor(Math.random() * 150);

        // Adjust for weather
        if (weather?.condition === "비") {
          baseBreakfast = Math.floor(baseBreakfast * 0.8);
          baseLunch = Math.floor(baseLunch * 0.9);
          baseDinner = Math.floor(baseDinner * 0.85);
        }

        // Adjust for events
        if (dayEvents.length > 0) {
          const eventImpact =
            dayEvents.reduce((sum, event) => sum + event.people, 0) * 0.3;
          baseLunch += Math.floor(eventImpact * 0.7);
          baseDinner += Math.floor(eventImpact * 0.3);
        }

        return {
          date,
          breakfast: baseBreakfast,
          lunch: baseLunch,
          dinner: baseDinner,
          totalStudents: baseBreakfast + baseLunch + baseDinner,
          weather: weather?.condition || "정보 없음",
          temperature: weather?.temperature || 0,
          events: dayEvents.map((e) => e.eventTitle),
        };
      });
      setWeatherData(mockWeather);
      mockEvents.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      setEvents(mockEvents);
      setPredictions(mockPredictions);
      setSelectedDate(getDates()[0]);
    });
  }, []);

  // Format date for display (YYYY-MM-DD -> MM월 DD일)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  // Get day of week
  const getDayOfWeek = (dateString: string) => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  return (
    <div className="bg-blue-50 min-h-screen pb-12">
      <div className="max-w-6xl mx-auto pt-8 px-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            명지대학교 식당 이용자 예측
          </h1>
          <p className="text-gray-600 mt-1">
            날씨와 행사 정보를 기반으로 예상 식당 이용자 수를 확인하세요
          </p>
        </div>

        {/* Weather and Events Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Weather Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              날씨 정보
            </h2>
            <div className="flex flex-col gap-4 bg-white">
              {weatherData.map((weather) => (
                <div
                  key={weather.date}
                  className={`flex items-center justify-between pb-3 border-b-1 border-sky-500`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{weather.icon}</span>
                    <div>
                      <p className="font-medium">
                        {formatDate(weather.date)} ({getDayOfWeek(weather.date)}
                        )
                      </p>
                      <p className="text-gray-600">{weather.condition}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{weather.temperature}°C</p>
                    <p className="text-sm text-gray-500">
                      강수확률 {weather.precipitation}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Events Card */}
          <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              주요 행사
            </h2>
            {events.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                예정된 행사가 없습니다
              </p>
            ) : (
              <div className="space-y-4">
                {events.map((event, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 border-sky-500"
                  >
                    <div className="flex justify-between">
                      <h3 className="font-medium text-blue-700">
                        {event.eventTitle}
                      </h3>
                      <span className="text-gray-600">
                        {formatDate(event.date)} ({getDayOfWeek(event.date)})
                      </span>
                    </div>
                    {/* <p className="text-gray-600 mt-1">{event.location}</p> */}
                    {/* <p className="text-gray-500 text-sm mt-2">
                      {event.description}
                    </p> */}
                    <div className="flex justify-between mt-3">
                      <span className="text-gray-500 text-sm">
                        예상 참여인원
                      </span>
                      <span className="font-medium text-blue-700">
                        {event.people.toLocaleString()}명
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Prediction Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            식당 이용자 예측 추이
          </h2>
          <div className="flex flex-wrap gap-3 mb-4">
            <button
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                selectedMeal === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setSelectedMeal("all")}
            >
              전체
            </button>
            <button
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                selectedMeal === "breakfast"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setSelectedMeal("breakfast")}
            >
              조식
            </button>
            <button
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                selectedMeal === "lunch"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setSelectedMeal("lunch")}
            >
              중식
            </button>
            <button
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                selectedMeal === "dinner"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setSelectedMeal("dinner")}
            >
              석식
            </button>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {selectedMeal === "all" ? (
                <LineChart
                  data={predictions.map((p) => ({
                    name: formatDate(p.date),
                    아침: p.breakfast,
                    점심: p.lunch,
                    저녁: p.dinner,
                  }))}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="아침"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="점심" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="저녁" stroke="#ffc658" />
                </LineChart>
              ) : (
                <BarChart
                  data={predictions.map((p) => ({
                    name: formatDate(p.date),
                    value:
                      selectedMeal === "breakfast"
                        ? p.breakfast
                        : selectedMeal === "lunch"
                        ? p.lunch
                        : p.dinner,
                  }))}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="value"
                    name={
                      selectedMeal === "breakfast"
                        ? "조식"
                        : selectedMeal === "lunch"
                        ? "중식"
                        : "석식"
                    }
                    fill={
                      selectedMeal === "breakfast"
                        ? "#8884d8"
                        : selectedMeal === "lunch"
                        ? "#82ca9d"
                        : "#ffc658"
                    }
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Predictions Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            일자별 상세 예측
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    날짜
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    날씨
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    행사
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    조식
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    중식
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    석식
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    총계
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {predictions.map((prediction) => (
                  <tr
                    key={prediction.date}
                    className={
                      selectedDate === prediction.date ? "bg-blue-50" : ""
                    }
                    onClick={() => setSelectedDate(prediction.date)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {formatDate(prediction.date)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {getDayOfWeek(prediction.date)}요일
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">
                          {
                            weatherData.find((w) => w.date === prediction.date)
                              ?.icon
                          }
                        </span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {prediction.weather}
                          </div>
                          <div className="text-sm text-gray-500">
                            {prediction.temperature}°C
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {prediction.events.length > 0 ? (
                        <div className="text-sm text-gray-900">
                          {prediction.events.join(", ")}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">행사 없음</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {prediction.breakfast.toLocaleString()}명
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {prediction.lunch.toLocaleString()}명
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {prediction.dinner.toLocaleString()}명
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {prediction.totalStudents.toLocaleString()}명
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommendation Section */}
        {selectedDate && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              운영 추천사항
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["breakfast", "lunch", "dinner"].map((meal, index) => {
                const selectedPrediction = predictions.find(
                  (p) => p.date === selectedDate
                );
                const mealCount =
                  meal === "breakfast"
                    ? selectedPrediction?.breakfast
                    : meal === "lunch"
                    ? selectedPrediction?.lunch
                    : selectedPrediction?.dinner;
                const mealName =
                  meal === "breakfast"
                    ? "조식"
                    : meal === "lunch"
                    ? "중식"
                    : "석식";
                const baseTables =
                  meal === "breakfast" ? 15 : meal === "lunch" ? 30 : 20;
                const recommendedStaff = Math.ceil((mealCount || 0) / 50);

                return (
                  <div
                    key={index}
                    className="border rounded-lg p-4 border-sky-500"
                  >
                    <h3 className="font-medium text-gray-800 mb-2">
                      {formatDate(selectedDate)} {mealName}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">예상 인원</span>
                        <span className="font-medium">
                          {mealCount?.toLocaleString()}명
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium"></span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">권장 인력</span>
                        <span className="font-medium">
                          {recommendedStaff}명
                        </span>
                      </div>
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-sm text-gray-600">
                          {mealCount && mealCount > baseTables * 6
                            ? "⚠️ 매우 혼잡할 것으로 예상됩니다. 추가 인력 배치를 고려하세요."
                            : mealCount && mealCount > baseTables * 4
                            ? "⚠️ 혼잡할 것으로 예상됩니다. 준비에 유의하세요."
                            : "👍 평균적인 이용객 수가 예상됩니다."}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealPredict;
