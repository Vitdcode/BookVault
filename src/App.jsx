import { useState } from "react";
import "./App.css";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";

function App() {
  const links = [
    { id: 1, path: "/home", icon: <AiOutlineHome size={30} /> },
    { id: 2, path: "/favorites", icon: <MdFavoriteBorder size={30} /> },
  ];

  const [books, setBooks] = useState([]);

  return (
    <div className="flex w-screen h-screen">
      <div className="w-[200px] ml-10 flex flex-col justify-center gap-5">
        {links.map((link) => (
          <NavLink
            to={link.path}
            key={link.id}
            className={({ isActive }) =>
              `p-4 ${isActive ? "active" : "not-active hover:bg-gray-600"}`
            }
          >
            {link.icon}
          </NavLink>
        ))}
      </div>
      <div className="flex flex-col items-center gap-20 w-screen">
        <Outlet context={{ books, setBooks }} />
      </div>
    </div>
  );
}

export default App;
