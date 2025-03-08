import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./routing-components/Home,";
import Favorites from "./routing-components/Favorites";
import BookPage from "./routing-components/BookPage";
import Bookmarks from "./routing-components/Bookmarks";
import CompletedBooks from "./routing-components/CompletedBooks";

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
      {
        path: "bookmarks",
        element: <Bookmarks />,
      },
      {
        path: "completed",
        element: <CompletedBooks />,
      },
    ],
  },
]);

export default router;
