import { SelectChangeEvent } from "@mui/material";
import format from "date-fns/format";
import { useState } from "react";
import { postPeople } from "../../api/weather";
import { MealType } from "../../type/chart";
import { WeatherType } from "../../type/weather";

export function useMealForecastInputForm() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [mealType, setMealType] = useState<MealType>("BREAKFAST");
  const [amount, setAmount] = useState<string>("");
  const [weatherType, setWeatherType] = useState<WeatherType>("SUNNY");
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleMealTypeChange = (event: SelectChangeEvent) => {
    setMealType(event.target.value as MealType);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleWeatherTypeChange = (event: SelectChangeEvent) => {
    setWeatherType(event.target.value as WeatherType);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedDate) {
      try {
        await postPeople({
          date: format(selectedDate, "yyyy-MM-dd"),
          mealType,
          people: Number(amount),
          weather: weatherType,
        });
        alert("성공");
        setAmount("");
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return {
    selectedDate,
    mealType,
    weatherType,
    handleMealTypeChange,
    handleWeatherTypeChange,
    handleDateChange,
    amount,
    handleAmountChange,
    handleSubmit,
  };
}
