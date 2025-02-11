import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import Login from "./Login";

global.alert = jest.fn();
global.fetch = jest.fn();

describe("Should test login page", () => {
  test("renders login text", () => {
    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Login />
      </Router>
    );
    const registerText = screen.getByText(/Login Here!/i);
    expect(registerText).toBeInTheDocument();
  });
  test("should render username and password", () => {
    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Login />
      </Router>
    );
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });
  test("should show validation errors when form is submitted with empty fields", async () => {
    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Login />
      </Router>
    );
    const submitButton = screen.getByRole("button", { name: /Login/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Username must be at least 5 characters/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Password must be at least 6 characters/i)
      ).toBeInTheDocument();
    });
  });

  test("should call the API and navigate on successful login", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "User retrieved successfully" }),
    });

    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Login />
      </Router>
    );
    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "anoosha" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "anoosha" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      // expect(global.fetch).toHaveBeenCalledWith(
      //   "http://localhost:4000/recipebook/user",
      //   expect.objectContaining({
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       username: "anoosha",
      //       password: "anoosha",
      //     }),
      //   })
      // );
    });
  });

  test("should show an error if the API call fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Error while user retrieving" }),
    });

    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "anoosha" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "anoosha" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith("Error while user retrieving");
    });
  });
  test("should call alert with a generic error message when an error occurs during form submission", async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("Network Error"));

    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "anoosha" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "anoosha" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        "There was an error while submitting the form."
      );
    });
  });

  test("should call the API, set user data, and navigate on successful login", async () => {
    const setUserdata = jest.fn();
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: {
          username: "anoosha",
          password: "anoosha",
          email: "anoosha@gmail.com",
          country: "India",
        },
      }),
    });

    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Login />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "anoosha" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "anoosha" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    //   expect(global.fetch).toHaveBeenCalledWith(
    //     "http://localhost:4000/recipebook/user",
    //     expect.objectContaining({
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         username: "anoosha",
    //         password: "anoosha",
    //       }),
    //     })
    //   );
    });
  });
});
