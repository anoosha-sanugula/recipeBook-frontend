import React from "react";
import "../src/styles/App.css";
import { Routes, Route } from "react-router-dom";
import Welcomepage from "./components/welcome/WelcomePage";
import Register from "./components/register/Register";
import HomePage from "./components/home/HomePage";
import Login from "./components/login/Login";
import { UserProvider } from "./components/context/UserContext";
import Profile from "./components/profile/Profile";
import Bookmarks from "./components/bookmarks/Bookmarks";
import RecipeCard from "./components/recipe/RecipeCard";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/" element={<Welcomepage />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<HomePage />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/recipe/:recipeId" element={<RecipeCard />}/>
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
