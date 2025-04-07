import { LineChart } from "@mui/x-charts/LineChart";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { ChartDataPoint, MealType } from "../type/chart";

interface WastLineChartProps {
  data: ChartDataPoint;
  mealType: MealType;
}

const WasteLineChart = ({ data, mealType }: WastLineChartProps) => {
  const getChartColor = (type: MealType) => {
    return type === "BREAKFAST"
      ? "#4CAF50"
      : type === "LUNCH"
      ? "#2196F3"
      : "#FF5722";
  };

  return (
    <LineChart
      xAxis={[
        {
          scaleType: "utc",
          data: data.dates,
          valueFormatter: (date) => format(date, "M.d", { locale: ko }),
          tickMinStep: 86400000,
        },
      ]}
      series={[
        {
          data: data.amounts,
          label: "쓰레기량 (L)",
          color: getChartColor(mealType),
        },
      ]}
      width={750}
      height={400}
      grid={{ vertical: true, horizontal: true }}
    />
  );
};

export default WasteLineChart;
