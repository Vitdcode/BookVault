import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./routing-components/Home,";
import Favorites from "./routing-components/Favorites";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />,
        index: true,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
    ],
  },
]);

export default router;
