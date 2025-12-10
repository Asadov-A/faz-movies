import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { FaChevronCircleLeft } from "react-icons/fa";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";

function Login() {
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPasw: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

  if (mode === "signup") {
  localStorage.setItem("fazUser", JSON.stringify(formData));

  await fetch("https://69198b479ccba073ee933bd9.mockapi.io/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  toast.success(
    `You have successfully created a ${formData.userName} account!`,
    { duration: 1500 }
  );

  setMode("login");
} else {
      const res = await fetch(
        "https://69198b479ccba073ee933bd9.mockapi.io/users"
      );
      const data = await res.json();

      const user = data.find(
        (u) =>
          u.userEmail === formData.userEmail && u.userPasw === formData.userPasw
      );

      if (user) {
        localStorage.setItem("loggedUser", JSON.stringify(user));
        localStorage.setItem(
          "faz-token",
          JSON.stringify(
            Math.round(Math.random() * 100000000) + "-faz-token-to*login"
          )
        );
        toast.success(`You have successfully logged in to ${user.userName} !`, {
          duration: 2000,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(`Incorrect email or password!`, {
          duration: 3000,
        });
      }
    }
  }

  return (
    <div className="login-container">
      <Toaster position="top-right" />
      <div className="login-box">
        <FaChevronCircleLeft
          onClick={() => navigate("/")}
          className="exit-btn"
        />

        <div className="mode-switch">
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
          >
            Log In
          </button>

          <button
            className={mode === "signup" ? "active" : ""}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        <h1>{mode === "login" ? "Welcome Back" : "Create Account"}</h1>
        <p className="subtitle">Faz Security Access</p>

        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <div className="input-block">
              <label>Username</label>
              <input
                type="text"
                name="userName"
                placeholder="Enter username"
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="input-block">
            <label>Email</label>
            <input
              type="email"
              name="userEmail"
              placeholder="Enter email"
              required
              onChange={handleChange}
            />
          </div>

          <div className="input-block">
            <label>Password</label>
            <input
              type="password"
              name="userPasw"
              placeholder="Enter password"
              required
              onChange={handleChange}
            />
          </div>

          <button className="login-btn" type="submit">
            {mode === "login" ? "Log In" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
