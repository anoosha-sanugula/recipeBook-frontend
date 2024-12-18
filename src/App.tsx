import React, { useEffect, useState } from "react";
import "../src/styles/App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Welcomepage from "./pages/welcome/WelcomePage";
import Register from "./pages/register/Register";
import HomePage from "./pages/home/HomePage";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Bookmarks from "./pages/bookmarks/Bookmarks";
import RecipeCard from "./pages/recipe/RecipeCard";

function App() {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userDataString = localStorage.getItem("userdata");
        if (userDataString) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      } catch (error) {
        setIsLogin(false);
      }
    };
    loadUserData();
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    setIsLogin(false);
    navigate("/login", { replace: true });
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={isLogin ? <HomePage /> : <Welcomepage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<HomePage />} />
        <Route path="bookmarks" element={<Bookmarks />} />
        <Route
          path="profile"
          element={<Profile handleLogout={handleLogout} />}
        />
        <Route path="/recipe/:recipeId" element={<RecipeCard />} />
      </Routes>
    </div>
  );
}

export default App;
