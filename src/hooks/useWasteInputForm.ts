import { useState } from "react";
import { MealType } from "../type/chart";
import { SelectChangeEvent } from "@mui/material";
import { postWaste } from "../api/waste";
import format from "date-fns/format";

export function useWasteInputForm() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [mealType, setMealType] = useState<MealType>("BREAKFAST");
  const [amount, setAmount] = useState<string>("");

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleMealTypeChange = (event: SelectChangeEvent) => {
    setMealType(event.target.value as MealType);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedDate) {
      try {
        await postWaste({
          date: format(selectedDate, "yyyy-MM-dd"),
          mealType,
          amount,
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
    handleMealTypeChange,
    handleDateChange,
    amount,
    handleAmountChange,
    handleSubmit,
  };
}
