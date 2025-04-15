import { BrowserRouter, Route, Routes } from "react-router-dom";
import MealForecastPage from "./page/MealForecastPage";
import WastePage from "./page/WastePage";
import MealForecastCalendar from "./page/MealForecastCalendar";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/waste" element={<WastePage />} />
        <Route
          path="/team01/meal-forecast-calendar"
          element={<MealForecastCalendar />}
        />
        <Route path="/team01/meal-forecast" element={<MealForecastPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
