import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import MealForecastCalendar from "./page/MealForecastCalendar";
import MealForecastPage from "./page/MealForecastPage";
import MealTicket from "./page/MealTicket";
import Fail from "./page/pay/Fail";
import PayPage from "./page/pay/PayPage";
import Success from "./page/pay/Success";

const DashboardLayout = () => {
  return (
    <div className="font-pretendard flex min-h-screen bg-gray-100">
      <Navigation />
      <div className="flex-grow ml-64 p-6">
        <div className="bg-white rounded-lg shadow-md p-6 min-h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/team1" element={<DashboardLayout />}>
          <Route index element={<MealForecastCalendar />} />
          <Route path="/team1/meal-forecast" element={<MealForecastPage />} />
          <Route path="/team1/mealTicket" element={<MealTicket />} />
          <Route path="/team1/pay" element={<PayPage />} />
          <Route path="/team1/pay/success" element={<Success />} />
          <Route path="/team1/pay/fail" element={<Fail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
