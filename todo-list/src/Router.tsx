import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Calendar from "./pages/Date";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Calendar",
    element: <Calendar />,
  },
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/Home/:date",
    element: <Home />,
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
]);
