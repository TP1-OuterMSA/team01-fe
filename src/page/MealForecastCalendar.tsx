import { DateCalendar } from "@mui/x-date-pickers";
import { Typography, Card, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
function MealForecastCalendar() {
  const navigate = useNavigate();

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
            <DateCalendar
              onChange={(date) => {
                const formatDate = format(date, "yyyy-MM-dd");
                navigate(`/team01/meal-forecast?date=${formatDate}`);
              }}
            />
          </Box>
        </Card>
      </div>
    </div>
  );
}

export default MealForecastCalendar;
