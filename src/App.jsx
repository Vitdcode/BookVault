import { useEffect, useState } from "react";
import "./App.css";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import ThemeProvider from "./ThemeProvider";
import { GoServer } from "react-icons/go";
import { LuSearch } from "react-icons/lu";
import bookApis, { themeApis } from "./api";

function App() {
  const links = [
    { id: 1, path: "/search", icon: <LuSearch size={30} /> },
    { id: 2, path: "/favorites", icon: <MdFavoriteBorder size={30} /> },
    { id: 3, path: "/bookmarks", icon: <FaRegBookmark size={30} /> },
    { id: 4, path: "/completed", icon: <FaCheck size={30} /> },
  ];

  const [fetchedBooks, setFetchedBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await bookApis.fetchBooks();
      data;
      const theme = await themeApis.getTheme();
      theme;
      if (theme) setTheme(theme);
      if (!data) return;
      setBooks(data);
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
