import { Box, Typography } from "@mui/material";
import { ChartDataPoint } from "../type/chart";

interface ChartSummaryProps {
  currentData: ChartDataPoint;
}

function ChartSummary({ currentData }: ChartSummaryProps) {
  return (
    <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
      <Typography>
        평균:{" "}
        {Math.round(
          currentData.amounts.reduce((a, b) => a + b, 0) /
            currentData.amounts.length
        )}
        g
      </Typography>
      <Typography>최대: {Math.max(...currentData.amounts)}g</Typography>
      <Typography>최소: {Math.min(...currentData.amounts)}g</Typography>
    </Box>
  );
}

export default ChartSummary;
