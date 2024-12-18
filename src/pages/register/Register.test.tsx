import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import Register from "./Register";

global.alert = jest.fn();
global.fetch = jest.fn();

describe("Should test register page", () => {
  test("renders register text", () => {
    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Register />
      </Router>
    );
    const registerText = screen.getByText(/Register Here!/i);
    expect(registerText).toBeInTheDocument();
  });
  test("should render username, email, password and country fields", () => {
    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Register />
      </Router>
    );
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Register/i })
    ).toBeInTheDocument();
  });
  test("should show validation errors when form is submitted with empty fields", async () => {
    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Register />
      </Router>
    );
    const submitButton = screen.getByRole("button", { name: /Register/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Username must be at least 5 characters/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Email is not valid/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Password must be at least 6 characters/i)
      ).toBeInTheDocument();
    });
  });

  test("should call the API and navigate on successful registration", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "User created successfully" }),
    });

    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Register />
      </Router>
    );
    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "anoosha" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "anoosha@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "anoosha" },
    });
    fireEvent.change(screen.getByLabelText(/Country/i), {
      target: { value: "India" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3000/recipebook/users",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "anoosha",
            email: "anoosha@gmail.com",
            password: "anoosha",
            country: "India",
          }),
        })
      );
    });
  });

  test("should show an error if the API call fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "User creation failed" }),
    });

    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Register />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "anoosha" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "anoosha@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "anoosha" },
    });
    fireEvent.change(screen.getByLabelText(/Country/i), {
      target: { value: "India" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith("User creation failed");
    });
  });
  test("should call alert with a generic error message when an error occurs during form submission", async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("Network Error"));

    render(
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Register />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "anoosha" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "anoosha@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "anoosha" },
    });
    fireEvent.change(screen.getByLabelText(/Country/i), {
      target: { value: "India" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        "There was an error while submitting the form."
      );
    });
  });
});
