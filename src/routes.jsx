import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./routing-components/Home,";
import Favorites from "./routing-components/Favorites";
import BookPage from "./routing-components/BookPage";

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
      {
        path: "book/:id",
        element: <BookPage />,
      },
    ],
  },
]);

export default router;
