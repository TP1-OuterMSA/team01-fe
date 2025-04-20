import { BrowserRouter, Route, Routes } from "react-router-dom";
import MealForecastPage from "./page/MealForecastPage";
import WastePage from "./page/WastePage";
import MealForecastCalendar from "./page/MealForecastCalendar";

const Router = () => {
  return (
    <BrowserRouter basename="/team1">
      <Routes>
        <Route path="/waste" element={<WastePage />} />
        <Route path="/team1" element={<MealForecastCalendar />} />
        <Route path="/team1/meal-forecast" element={<MealForecastPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
