import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UnAuthenticatedPage from "./UnAuthenticatedPage";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("UnAuthenticatedPage", () => {
  let navigate: any;

  beforeEach(() => {
    navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render the UnAuthenticatedPage correctly", () => {
    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <UnAuthenticatedPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Welcome to RecipeBook!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Please log in or register to continue./i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Register/i })
    ).toBeInTheDocument();
  });

  test("should navigate to /login when login button is clicked", () => {
    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <UnAuthenticatedPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    expect(navigate).toHaveBeenCalledWith("/login");
  });

  test("should navigate to /register when register button is clicked", () => {
    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <UnAuthenticatedPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Register/i }));
    expect(navigate).toHaveBeenCalledWith("/register");
  });
});
