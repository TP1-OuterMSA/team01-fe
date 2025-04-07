import { BrowserRouter, Route, Routes } from "react-router-dom";
import MealForecastPage from "./page/MealForecastPage";
import WastePage from "./page/WastePage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/waste" element={<WastePage />} />
        <Route path="/meal-forecast" element={<MealForecastPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
