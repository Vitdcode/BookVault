import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import ThemeProvider from "./ThemeProvider";
import bookImg from "/books.png";
import appTitleImg from "/app-title.png";
import { GoServer } from "react-icons/go";

function App() {
  const links = [
    { id: 1, path: "/home", icon: <AiOutlineHome size={30} /> },
    { id: 2, path: "/favorites", icon: <MdFavoriteBorder size={30} /> },
    { id: 3, path: "/bookmarks", icon: <FaRegBookmark size={30} /> },
    { id: 4, path: "/completed", icon: <FaCheck size={30} /> },
  ];

  const [fetchedBooks, setFetchedBooks] = useState([]); //used for fetching
  const [books, setBooks] = useState([]); //used for rendering
  const [theme, setTheme] = useState("");
  /*   const theme = useRef(""); */

  useEffect(() => {
    const fetchData = async () => {
      const url = "/api";
      const response = await fetch(url);
      const data = await response.json();
      data.theme;
      setTheme(data.theme);
      /*       theme.current = data.theme; */
      if (!data || !data.books) return [];

      data;
      return setBooks(data.books);
    };

    fetchData();
  }, []);

  return (
    <div className="flex w-screen h-screen relative">
      <div className="w-[120px] flex flex-col justify-center items-center gap-5 border-r border-base-300 ">
        <div className="bg-base-300 p-5 shadow-lg mb-auto top-0 left-0 w-[100%]">
          <img src={bookImg} alt="Book Image" className="" />
          <img src={appTitleImg} alt="App Title" className="" />
        </div>
        <div className="w-[100%] h-[100%] flex flex-col justify-center items-center gap-5 border-r border-base-300 mb-[150px]">
          {links.map((link) => (
            <NavLink
              to={link.path}
              key={link.id}
              className={({ isActive }) =>
                `p-4 ${isActive ? "active" : "not-active hover:bg-base-300"}`
              }
            >
              {link.icon}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-20 w-screen relative">
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
    </div>
  );
}

export default App;
