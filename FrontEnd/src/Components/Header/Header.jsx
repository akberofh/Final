// Header.jsx

import React, { useState, useEffect } from "react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export const Navlinks = [

  {
    id: 2,
    name: "BASKET",
    link: "/basket",
  },
  {
    id: 2,
    name: "COMMENT",
    link: "/comment",
  },
  {
    id: 2,
    name: "CHAT",
    link: "http://localhost:5173/",
    target: "_blank"
  },
  {

    id: 2,
    name: "ADMIN",
    link: "/admin",

  },
  {
    id: 2,
    name: "LOGIN",
    link: "/login",
  },
  {
    id: 1,
    name: "PROFILE",
    link: "/profile",
  },
  {
    id: 1,
    name: "ABOUT",
    link: "/about",
  },
  {
    id: 1,
    name: "CONTACT",
    link: "/contact",
  },
];

const Header = ({ theme, setTheme }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const home = () => {
    navigate("/");
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Local storage'dan token'ı alıyoruz
    axios.get('http://localhost:8000/api/users', {
      headers: {
        Authorization: `Bearer ${token}` // Token'ı Authorization header'ına ekliyoruz
      }
    })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Kullanıcı bilgileri alınamadı:', error);
      });
  }, []);

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMenu]);

  return (
    <div className="relative z-10 shadow-md w-full dark:bg-black dark:text-white duration-300">
      <div className="container py-2 md:py-0">
        <div className="flex justify-between items-center">
          <div>
            <span onClick={home} className="text-3xl font-bold font-serif cursor-pointer">Car Rental</span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {Navlinks.filter(({ name }) => name !== "ADMIN" || (name === "ADMIN" && userInfo && userInfo.userType === "Admin")).map(({ id, name, link, target }) => (
                <li key={id} className="py-4">
                  <a
                    href={link}
                    target={target}
                    className="text-lg font-medium hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500"
                  >
                    {name}
                  </a>
                </li>
              ))}
              {theme === "dark" ? (
                <BiSolidSun
                  onClick={() => setTheme("light")}
                  className="text-2xl cursor-pointer"
                />
              ) : (
                <BiSolidMoon
                  onClick={() => setTheme("dark")}
                  className="text-2xl cursor-pointer"
                />
              )}
            </ul>
          </nav>
          <div className="flex items-center gap-4 md:hidden">
            {theme === "dark" ? (
              <BiSolidSun
                onClick={() => setTheme("light")}
                className="text-2xl cursor-pointer"
              />
            ) : (
              <BiSolidMoon
                onClick={() => setTheme("dark")}
                className="text-2xl cursor-pointer"
              />
            )}
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            )}
          </div>

        </div>
      </div>
      <ResponsiveMenu showMenu={showMenu} user={user} />
      {/* Chat penceresini göstermek için */}
    </div>
  );
};

export default Header;
