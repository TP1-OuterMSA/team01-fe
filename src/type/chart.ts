export interface ChartDataPoint {
  dates: Date[];
  amounts: number[];
}

export type MealType = "BREAKFAST" | "LUNCH" | "DINNER";

export interface ChartRecentWastesAPI {
  id: number;
  date: string;
  amount: number;
  mealType: MealType;
}

export type Periods = "week" | "month" | "quarter";
