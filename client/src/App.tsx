import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import OlapCube from "./pages/OlapCube";
import CustomerOrder from "./pages/CustomerOrder";
import Dashboard from "./pages/Dashboard";
import DeliveryOrder from "./pages/DeliveryOrder";
import Statistics from "./pages/Statistics";
import Development from "./pages/Development";
import Testing from "./pages/Testing";
import Designing from "./pages/Designing";
import Courses from "./pages/Courses";

type TRoute = {
  path: string;
  Component: JSX.Element;
};

const routesConfig: TRoute[] = [
  {
    path: "/",
    Component: <Dashboard />,
  },
  {
    path: "/statistics",
    Component: <Statistics />,
  },
  {
    path: "/development",
    Component: <Development />,
  },
  {
    path: "/testing",
    Component: <Testing />,
  },
  {
    path: "/designing",
    Component: <Designing />,
  },
  {
    path: "/courses",
    Component: <Courses />,
  },
];

const App = () => {
  const routes = routesConfig.map((el) => (
    <Route path={el.path} element={el.Component} />
  ));
  return (
    <div className="w-screen flex">
      <Sidebar />
      <Routes>{routes}</Routes>
    </div>
  );
};

export default App;
