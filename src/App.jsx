import { useState } from "react";
import "./App.css";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import ThemeProvider from "./ThemeProvider";

function App() {
  const links = [
    { id: 1, path: "/home", icon: <AiOutlineHome size={30} /> },
    { id: 2, path: "/favorites", icon: <MdFavoriteBorder size={30} /> },
    { id: 3, path: "/bookmarks", icon: <FaRegBookmark size={30} /> },
    { id: 4, path: "/completed", icon: <FaCheck size={30} /> },
  ];

  const [fetchedBooks, setFetchedBooks] = useState([]); //used for fetching
  const [books, setBooks] = useState([]); //used for rendering

  return (
    <div className="flex w-screen h-screen">
      <div className="w-[100px] ml-10 flex flex-col justify-center gap-5 border-r border-base-300">
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

      <div className="flex flex-col items-center gap-20 w-screen relative">
        <ThemeProvider />

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
