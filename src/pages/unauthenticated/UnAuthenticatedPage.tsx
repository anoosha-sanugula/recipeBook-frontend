import React from "react";
import { useNavigate } from "react-router-dom";
import "./UnAuthenticatedPage.css";

const UnAuthenticatedPage = () => {
  const navigate = useNavigate();
  return (
    <div className="background-image">
      <h1>Welcome to RecipeBook!</h1>
      <p>Please log in or register to continue.</p>
      <button className="login" onClick={() => navigate("/login")}>
        Login
      </button>
      <button className="register" onClick={() => navigate("/register")}>
        Register
      </button>
    </div>
  );
};

export default UnAuthenticatedPage;
