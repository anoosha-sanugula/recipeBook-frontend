import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import React from "react";

describe("App Component", () => {
  test('renders Welcomepage on "/" route when not logged in', async () => {
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

  test('renders HomePage on "/" route when logged in', async () => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn().mockReturnValue('{"username": "testUser"}'),
      },
      writable: true,
    });

    render(
      <MemoryRouter
        initialEntries={["/"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Recipes:/i)).toBeInTheDocument();
  });

  test('renders Register page on "/register" route', async () => {
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

  test('navigates to Register page when "Start Cooking!" button is clicked', async () => {
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

  test("correctly sets isLogin to false when no user data in localStorage", async () => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn().mockReturnValue(null),
      },
      writable: true,
    });

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
  });

  test("correctly sets isLogin to true when user data is in localStorage", async () => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn().mockReturnValue('{"username": "testUser"}'),
      },
      writable: true,
    });

    render(
      <MemoryRouter
        initialEntries={["/"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Recipes:/i)).toBeInTheDocument();
  });

  test("does not crash and renders WelcomePage even when localStorage.getItem fails", async () => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn().mockImplementation(() => {
          throw new Error("LocalStorage error");
        }),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });

    render(
      <MemoryRouter
        initialEntries={["/"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(
        screen.getByText(/Recipes Right for Your Family/i)
      ).toBeInTheDocument();
    });
    expect(screen.getByText(/Start Cooking!/i)).toBeInTheDocument();
  });

  test("handles error in useEffect when localStorage.getItem throws an error", async () => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn().mockImplementation(() => {
          throw new Error("Failed to read localStorage");
        }),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });

    render(
      <MemoryRouter
        initialEntries={["/"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <App />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(
        screen.getByText(/Recipes Right for Your Family/i)
      ).toBeInTheDocument()
    );

    expect(screen.getByText(/Start Cooking!/i)).toBeInTheDocument();
  });
  test("does not crash and renders WelcomePage even when localStorage.getItem fails", async () => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn().mockImplementation(() => {
          throw new Error("LocalStorage error");
        }),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });

    render(
      <MemoryRouter
        initialEntries={["/"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Recipes Right for Your Family/i)
      ).toBeInTheDocument();
    });

    expect(screen.getByText(/Start Cooking!/i)).toBeInTheDocument();
  });
  test("handles error in useEffect when localStorage.getItem throws an error", async () => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn().mockImplementation(() => {
          throw new Error("Failed to read localStorage");
        }),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });

    render(
      <MemoryRouter
        initialEntries={["/"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <App />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(
        screen.getByText(/Recipes Right for Your Family/i)
      ).toBeInTheDocument()
    );

    expect(screen.getByText(/Start Cooking!/i)).toBeInTheDocument();
  });
});
