import { Box, Card, Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

function MealForecastCalendar() {
  const navigate = useNavigate();
  // const [open, setOpen] = useState(false);
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // const handleClose = () => {
  //   // setOpen(false);
  // };

  const handleDateChange = (date: Date) => {
    // setSelectedDate(date);
    // setOpen(true);
    handleSubmit(date);
  };

  const handleSubmit = (date: Date) => {
    const formatDate = format(date, "yyyy-MM-dd");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date > today) {
      alert("오늘 이후의 날짜는 선택할 수 없습니다.");
      return;
    }
    navigate(`/team1/meal-forecast?date=${formatDate}`);
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

      {/* <WeatherSelectDialog
        open={open}
        handleClose={handleClose}
        selectedDate={selectedDate}
        onSubmit={handleSubmit}
      /> */}
    </div>
  );
}

export default MealForecastCalendar;
