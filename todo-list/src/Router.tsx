import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Date from "./pages/Date";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Date/:userId",
    element: <Date />,
  },
  {
    path: "/Home/:userId/:date",
    element: <Home />,
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
]);
