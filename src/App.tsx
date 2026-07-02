import { BrowserRouter, useRoutes } from "react-router-dom";
import routes from "./router";

function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}