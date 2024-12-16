import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import WelcomePage from "./WelcomePage";

describe("Should test welcome page", () => {
  test("renders welcome text", () => {
    render(
      <Router future={{v7_startTransition:true, v7_relativeSplatPath:true}}>
        <WelcomePage />
      </Router>
    );
    const welcomeMessage = screen.getByText(/Recipes Right for Your Family/i);
    expect(welcomeMessage).toBeInTheDocument();
  });
});
