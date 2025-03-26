import { useEffect, useState } from "react";
import "./App.css";
import { Link, NavLink, Outlet } from "react-router-dom";

/* icons */
import { MdFavoriteBorder } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import ThemeProvider from "./ThemeProvider";

import bookApis, { themeApis } from "./api";

function App() {
  const links = [
    { id: 1, path: "/search", icon: <LuSearch size={30} /> },
    { id: 2, path: "/favorites", icon: <MdFavoriteBorder size={30} /> },
    { id: 3, path: "/bookmarks", icon: <FaRegBookmark size={30} /> },
    { id: 4, path: "/completed", icon: <FaCheck size={30} /> },
    { id: 5, path: "/statistics", icon: <IoStatsChart size={30} /> },
  ];

  const [fetchedBooks, setFetchedBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [theme, setTheme] = useState("");
  const [booksRead, setBooksRead] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allBooks, bookCount, theme] = await Promise.all([
          bookApis.fetchBooks().catch(() => []),
          bookApis.countFinishedBooksCurrentYear().catch(() => ({ booksReadThisYear: 0 })),
          themeApis.getTheme().catch(() => "light"),
        ]);

        console.log(bookCount);

        if (allBooks) setBooks(allBooks);
        if (bookCount) setBooksRead(bookCount);
        if (theme) setTheme(theme);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-screen">
      <div className="flex flex-col items-center flex-1">
        <ThemeProvider savedTheme={theme} />
        <Outlet
          context={{
            fetchedBooks,
            setFetchedBooks,
            books,
            setBooks,
            booksRead,
          }}
        />
      </div>
      <div className="w-[90%] mx-auto flex justify-center items-center gap-5 sticky bottom-0 bg-base-200 rounded-2xl ">
        {links.map((link, index) => (
          <NavLink
            to={link.path}
            key={index}
            className={({ isActive }) =>
              `p-4 ${isActive ? "active" : "not-active hover:bg-base-300"}`
            }
          >
            {link.icon}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default App;
