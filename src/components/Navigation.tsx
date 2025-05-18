import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="h-screen w-64 bg-gray-800 fixed left-0 top-0 shadow-lg">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-white text-xl font-bold">식사 관리 대시보드</h1>
      </div>
      <div className="mt-6 px-4">
        <Link
          to="/team1/"
          className={`flex items-center px-4 py-3 mb-3 rounded-lg transition-all duration-300 ${
            location.pathname === "/team1/meal-forecast" ||
            location.pathname === "/team1/"
              ? "bg-blue-600 text-white font-medium"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 15a4 4 0 004 4h9a5 5 0 10-4.546-7.093"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.5 12v-.5m4 .5v-.5m4 .5V12"
            />
          </svg>
          <span>식사 분석</span>
        </Link>
        <Link
          to="/team1/mealTicket"
          className={`flex items-center px-4 py-3 mb-3 rounded-lg transition-all duration-300 ${
            location.pathname === "/team1/mealTicket" ||
            location.pathname === "/team1/pay" ||
            location.pathname === "/team1/pay/success" ||
            location.pathname === "/team1/pay/fail"
              ? "bg-blue-600 text-white font-medium"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
            />
          </svg>
          <span>식권 관리</span>
        </Link>
        <Link
          to="/team1/meal-predict"
          className={`flex items-center px-4 py-3 mb-3 rounded-lg transition-all duration-300 ${
            location.pathname === "/team1/meal-predict"
              ? "bg-blue-600 text-white font-medium"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 15a4 4 0 004 4h9a5 5 0 10-4.546-7.093"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.5 12v-.5m4 .5v-.5m4 .5V12"
            />
          </svg>
          <span>식사 예측</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
