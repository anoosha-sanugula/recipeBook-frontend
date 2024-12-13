import React from "react";
import "./WelcomePage.css";
import { useNavigate } from "react-router-dom";
const Welcomepage = () => {
  const navigate = useNavigate();
  return (
    <div className="body">
      <div>
        <div className="header">
          <h2>Recipes Right for Your Family</h2>
          <p>
            Have a picky eater? Short on time? Sort recipes by kid-friendly,
            prep time and more.
          </p>
        </div>
        <div>
          <button className="start-button" onClick={() => navigate("register")}>
            Start Cooking!
          </button>
        </div>
      </div>
      <div className="slide-content">
        <div className="slide-title">Got left over food in the fridge?</div>
        <div className="slide-text">
          <p>The kitchen is a place of discovery, creativity, and comfort.</p>
          <p> Start cooking and make the moment perfect.</p>
        </div>
        <div className="learn-wrapper">
          <a
            className="learn-more"
            href="https://www.foodwise.com.au/better-by-the-box"
          ></a>
        </div>
      </div>
    </div>
  );
};

export default Welcomepage;
