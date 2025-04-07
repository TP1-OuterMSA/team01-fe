import { useState } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import MealTypeSelector from "./MealTypeSelector";
import WasteLineChart from "./WastLineChart";
import { MealType } from "../type/chart";
import { useRecentWastes } from "../hooks/useRecentWastes";
import { CHART_TITLE } from "../constants/chartTitle";

const MealWasteChart = () => {
  const [mealType, setMealType] = useState<MealType>("BREAKFAST");
  const { chartData, loading } = useRecentWastes(mealType);

  const handleMealTypeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMealType: MealType | null
  ) => {
    if (!newMealType) return;
    setMealType(newMealType);
  };

  const chartTitle = CHART_TITLE[mealType];

  return (
    <Box sx={{ width: "100%", maxWidth: 700, mx: "auto", mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        최근 7일간 음식물 쓰레기 배출량
      </Typography>
      <MealTypeSelector
        mealType={mealType}
        handleMealTypeChange={handleMealTypeChange}
      />
      <Typography variant="h6" gutterBottom>
        {chartTitle}
      </Typography>
      {loading || !chartData ? (
        <Skeleton width={700} height={400} />
      ) : (
        <WasteLineChart data={chartData} mealType={mealType} />
      )}
    </Box>
  );
};

export default MealWasteChart;
