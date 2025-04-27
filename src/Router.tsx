import { BrowserRouter, Route, Routes } from "react-router-dom";
import MealForecastPage from "./page/MealForecastPage";
import WastePage from "./page/WastePage";
import MealForecastCalendar from "./page/MealForecastCalendar";
import PayPage from "./page/pay/PayPage";
import Success from "./page/pay/Success";
import Fail from "./page/pay/Fail";
import MealTicket from "./page/MealTicket";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/waste" element={<WastePage />} />
        <Route path="/team1" element={<MealForecastCalendar />} />
        <Route path="/team1/meal-forecast" element={<MealForecastPage />} />
        <Route path="/team1/mealTicket" element={<MealTicket />} />
        <Route path="/team1/pay" element={<PayPage />} />
        <Route path="/team1/pay/success" element={<Success />} />
        <Route path="/team1/pay/fail" element={<Fail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
