import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import Profile from "./Profile";
import React from "react";

describe("Profile Component", () => {
  let mockHandleLogout: any;

  beforeEach(() => {
    mockHandleLogout = jest.fn();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("renders profile information when user is authenticated", () => {
    const userdata = {
      username: "anoosha",
      email: "anoosha@gmail.com",
      country: "USA",
    };
    localStorage.setItem("accessToken", "dummyToken");
    localStorage.setItem("userdata", JSON.stringify(userdata));

    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Profile handleLogout={mockHandleLogout} />
      </Router>
    );

    expect(screen.getByText("Welcome, anoosha")).toBeInTheDocument();
  });

  test("renders UnAuthenticatedPage when user is not authenticated", () => {
    localStorage.removeItem("accessToken");

    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Profile handleLogout={mockHandleLogout} />
      </Router>
    );
    expect(
      screen.getByText("Please log in or register to continue.")
    ).toBeInTheDocument();
  });

  test("calls handleLogout when the logout button is clicked", async () => {
    const userdata = {
      username: "John Doe",
      email: "john@example.com",
      country: "USA",
    };
    localStorage.setItem("accessToken", "dummyToken");
    localStorage.setItem("userdata", JSON.stringify(userdata));

    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Profile handleLogout={mockHandleLogout} />
      </Router>
    );
    fireEvent.click(screen.getByText("Logout"));
    await waitFor(() => expect(mockHandleLogout).toHaveBeenCalledTimes(1));
  });
});
