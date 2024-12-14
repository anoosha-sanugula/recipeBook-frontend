import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import React from "react";

describe("App Component", () => {
  test('renders Welcomepage on "/" route', () => {
    render(
      <MemoryRouter
        initialEntries={["/"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByText(/Recipes Right for Your Family/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Start Cooking!/i)).toBeInTheDocument();
  });

  test('renders Register page on "/register" route', () => {
    render(
      <MemoryRouter
        initialEntries={["/register"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Register Here!/i)).toBeInTheDocument();
  });

  test('navigates to Register page when "Start Cooking!" button is clicked', () => {
    render(
      <MemoryRouter
        initialEntries={["/"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <App />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText(/Start Cooking!/i));
    expect(screen.getByText(/Register Here!/i)).toBeInTheDocument();
  });
});
