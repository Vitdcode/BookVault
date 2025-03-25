import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Favorites from "./routing-components/Favorites";
import BookPage from "./routing-components/BookPage";
import Bookmarks from "./routing-components/Bookmarks";
import CompletedBooks from "./routing-components/CompletedBooks";
import Search from "./routing-components/Search";
import Statistics from "./routing-components/Statistics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "search",
        element: <Search />,
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
      {
        path: "statistics",
        element: <Statistics />,
      },
    ],
  },
]);

export default router;
