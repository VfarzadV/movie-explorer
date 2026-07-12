import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Subscriptions from "./pages/Subscriptions";
import Support from "./pages/Support";
import MovieDetail from "./pages/MovieDetail";
import MoviesPage from "./pages/MoviesPage";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/LogIn", element: <LogIn /> },
  { path: "/Register", element: <Register /> },
  { path: "/Support", element: <Support /> },
  { path: "/Subscriptions", element: <Subscriptions /> },
  { path: "/MoviesPage", element: <MoviesPage /> },
  { path: "/movie/:id", element: <MovieDetail /> },
];

export default routes;