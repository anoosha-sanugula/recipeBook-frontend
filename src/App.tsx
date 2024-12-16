import React, { useEffect, useState } from "react";
import "../src/styles/App.css";
import { Routes, Route } from "react-router-dom";
import Welcomepage from "./components/welcome/WelcomePage";
import Register from "./components/register/Register";
import HomePage from "./components/home/HomePage";
import Login from "./components/login/Login";
import Profile from "./components/profile/Profile";
import Bookmarks from "./components/bookmarks/Bookmarks";
import RecipeCard from "./components/recipe/RecipeCard";

function App() {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
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

  return (
    <div className="App">
      <Routes>
        {isLogin ? (
          <Route path="/" element={<HomePage />} />
        ) : (
          <Route path="/" element={<Welcomepage />} />
        )}
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<HomePage />} />
        <Route path="bookmarks" element={<Bookmarks />} />
        <Route path="profile" element={<Profile />} />
        <Route path="/recipe/:recipeId" element={<RecipeCard />} />
      </Routes>
    </div>
  );
}

export default App;
