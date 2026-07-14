import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Subscriptions from "./pages/Subscriptions";
import Support from "./pages/Support";
import MovieDetail from "./pages/MovieDetail";
import MoviesPage from "./pages/MoviesPage";
import GenrePage from "./pages/GenrePage";
import GenreDetailsPage from "./pages/GenreDetailsPage";
import Series from "./pages/Series";
import SeriesDetail from "./pages/SeriesDetail";
import AnimePage from "./pages/AnimePage";
import TrailerPage from "./pages/TrailerPage";
import WatchlistPage from "./pages/WatchlistPage";


const routes = [
  { path: "/", element: <Home /> },
  { path: "/LogIn", element: <LogIn /> },
  { path: "/Register", element: <Register /> },
  { path: "/Support", element: <Support /> },
  { path: "/Subscriptions", element: <Subscriptions /> },
  { path: "/MoviesPage", element: <MoviesPage /> },
  { path: "/movie/:id", element: <MovieDetail /> },
  { path: "/genre", element: <GenrePage /> },
  { path: "/genre/:id", element: <GenreDetailsPage /> },
  { path: "/series", element: <Series /> },
  { path: "/series/:id", element: <SeriesDetail /> },
  { path: "/anime", element: <AnimePage /> },
  { path: "/trailer/:mediaType/:id", element: <TrailerPage /> },
  { path: "/watchlist", element: <WatchlistPage /> },
];

export default routes;