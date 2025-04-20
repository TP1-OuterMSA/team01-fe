import { DateCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Typography, Card, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useState } from "react";
import WeatherSelectDialog from "../component/dialog/WeatherSelectDialog";

function MealForecastCalendar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setOpen(true);
  };

  const handleSubmit = (selectedWeather: string, date: Date) => {
    const formatDate = format(date, "yyyy-MM-dd");
    navigate(
      `/team1/meal-forecast?date=${formatDate}&weather=${selectedWeather}`
    );
  };

  return (
    <div className="w-full flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Typography
        variant="h4"
        className="text-center font-bold pb-6 text-indigo-800"
      >
        급식 예측 달력
      </Typography>
      <div className="flex flex-col gap-6">
        <Card className="shadow-lg p-10">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={ko}
            >
              <DateCalendar onChange={handleDateChange} />
            </LocalizationProvider>
          </Box>
        </Card>
      </div>

      <WeatherSelectDialog
        open={open}
        handleClose={handleClose}
        selectedDate={selectedDate}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default MealForecastCalendar;
