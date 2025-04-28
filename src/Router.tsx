import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import MealForecastCalendar from "./page/MealForecastCalendar";
import MealForecastPage from "./page/MealForecastPage";
import MealTicket from "./page/MealTicket";
import Fail from "./page/pay/Fail";
import PayPage from "./page/pay/PayPage";
import Success from "./page/pay/Success";
import WastePage from "./page/WastePage";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="font-pretendard flex min-h-screen bg-gray-100">
      <Navigation />
      <div className="flex-grow ml-64 p-6">
        <div className="bg-white rounded-lg shadow-md p-6 min-h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/waste" element={<WastePage />} />
        <Route
          path="/team1"
          element={
            <DashboardLayout>
              <MealForecastCalendar />
            </DashboardLayout>
          }
        />
        <Route
          path="/team1/meal-forecast"
          element={
            <DashboardLayout>
              <MealForecastPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/team1/mealTicket"
          element={
            <DashboardLayout>
              <MealTicket />
            </DashboardLayout>
          }
        />
        <Route
          path="/team1/pay"
          element={
            <DashboardLayout>
              <PayPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/team1/pay/success"
          element={
            <DashboardLayout>
              <Success />
            </DashboardLayout>
          }
        />
        <Route
          path="/team1/pay/fail"
          element={
            <DashboardLayout>
              <Fail />
            </DashboardLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
