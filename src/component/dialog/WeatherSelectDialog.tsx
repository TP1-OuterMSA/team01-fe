import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Paper,
  Box,
  Divider,
  Button,
  DialogActions,
  Grid2,
} from "@mui/material";

import { format } from "date-fns";
import { useState, useEffect } from "react";

interface WeatherSelectDialogProps {
  open: boolean;
  handleClose: () => void;
  selectedDate: Date | null;
  onSubmit: (selectedWeather: string, date: Date) => void;
}

function WeatherSelectDialog({
  open,
  handleClose,
  selectedDate,
  onSubmit,
}: WeatherSelectDialogProps) {
  const [selectedWeather, setSelectedWeather] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setSelectedWeather(null);
    }
  }, [open]);

  const handleWeatherSelect = (weather: string) => {
    setSelectedWeather(weather);
  };

  const handleSubmit = () => {
    if (selectedWeather && selectedDate) {
      onSubmit(selectedWeather, selectedDate);
    }
    handleClose();
  };

  const weatherOptions = [
    { icon: "☀️", label: "맑음", value: "SUNNY", color: "#FFB347" },
    { icon: "☁️", label: "흐림", value: "CLOUDY", color: "#B0C4DE" },
    { icon: "🌧️", label: "비", value: "RAINY", color: "#87CEFA" },
    { icon: "❄️", label: "눈", value: "SNOWY", color: "#E0FFFF" },
  ];

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
          py: 2,
        }}
      >
        {selectedDate &&
          `${format(selectedDate, "yyyy년 MM월 dd일")} 날씨 선택`}
      </DialogTitle>

      <DialogContent sx={{ p: 3, mt: 2 }}>
        <Typography variant="body1" sx={{ mb: 2, textAlign: "center" }}>
          오늘의 날씨를 선택해 주세요
        </Typography>

        <Grid2 container spacing={2} sx={{ mt: 1 }}>
          {weatherOptions.map((option) => (
            <Grid2 key={option.value}>
              <Paper
                elevation={selectedWeather === option.value ? 4 : 1}
                sx={{
                  p: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  backgroundColor:
                    selectedWeather === option.value ? option.color : "white",
                  border:
                    selectedWeather === option.value
                      ? "2px solid #3f51b5"
                      : "1px solid #e0e0e0",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: 3,
                  },
                  borderRadius: "12px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => handleWeatherSelect(option.value)}
              >
                <Box sx={{ fontSize: "2rem", mb: 1 }}>{option.icon}</Box>
                <Typography
                  variant="body2"
                  fontWeight={
                    selectedWeather === option.value ? "bold" : "normal"
                  }
                >
                  {option.label}
                </Typography>
              </Paper>
            </Grid2>
          ))}
        </Grid2>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ px: 3, py: 2, justifyContent: "space-between" }}>
        <Button onClick={handleClose} variant="outlined">
          취소
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={!selectedWeather}
          sx={{
            px: 3,
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default WeatherSelectDialog;
