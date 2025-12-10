import React, { useState } from "react";
import "./Header.css";
import Logo from "/logo-2.png";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { LuCircleUserRound } from "react-icons/lu";
import { toast } from "react-hot-toast";   // ✅ Добавили!

function Header() {
  const [userMenu, setUserMenu] = useState(false);
  const navigate = useNavigate();

  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  const logout = () => {
    localStorage.removeItem("faz-token");
    localStorage.removeItem("loggedUser");
    setUserMenu(false);

    toast.success(`You have been logged out of your account.`, {
      duration: 1500,
    });

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <header>
      <NavLink to={"/"}>
        <img src={Logo} alt="faz-movies--logo" />
      </NavLink>

      <nav>
        <NavLink to={"/"}><p>Home</p></NavLink>
        <NavLink to={"/movies"}><p>Movies</p></NavLink>
        <NavLink to={"/contact"}><p>Contact</p></NavLink>
      </nav>

      {loggedUser ? (
        <FaUserCircle
          onClick={() => setUserMenu(!userMenu)}
          className="user-logo"
        />
      ) : (
        <NavLink to={"/login"}>
          <button>LogIn</button>
        </NavLink>
      )}

      {userMenu && loggedUser && (
        <div className="user-menu">
          <LuCircleUserRound className="user-ava" />
          <h3>{loggedUser.userName}</h3>
          <p>{loggedUser.userEmail}</p>
          <button onClick={logout} className="log-out">LogOut</button>
        </div>
      )}
    </header>
  );
}

export default Header;
