import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/LogIn", element: <LogIn /> },
  { path: "/Register", element: <Register /> },
];

export default routes;