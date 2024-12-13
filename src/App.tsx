import React from "react";
import "../src/styles/App.css";
import { Routes, Route } from "react-router-dom";
import Welcomepage from "./components/welcome/WelcomePage";
import Register from "./components/register/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcomepage />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
