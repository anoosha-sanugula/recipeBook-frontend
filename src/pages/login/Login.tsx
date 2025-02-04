import React from "react";
import "./Login.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { Credentials } from "./Credentials.type";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Credentials>();

  const loginUser: SubmitHandler<Credentials> = async (credentials: any) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      if (response.ok) {
        const userdata = await response.json();
        const user = {
          username: userdata.data.username,
          password: userdata.data.password,
          email: userdata.data.email,
          country: userdata.data.country,
        };
        localStorage.setItem("userdata", JSON.stringify(user));
        const token = userdata.token || userdata.accessToken;
        if (token) {
          localStorage.setItem("accessToken", token);
        }
        navigate("/home",{ replace: true });
      } else {
        const result = await response.json();
        alert(result.message);
      }
    } catch (error) {
      alert("There was an error while submitting the form.");
    } finally {
      reset();
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(loginUser)}>
        <h3>Login Here!</h3>
        <div className="form-control">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: true,
              minLength: {
                value: 5,
                message: "Username must be at least 5 characters.",
              },
            })}
          />
          {errors.username && (
            <p className="errorMsg">Username must be at least 5 characters</p>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: true,
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters.",
              },
            })}
          />
          {errors.password && (
            <p className="errorMsg">Password must be at least 6 characters</p>
          )}
        </div>

        <div className="form-control">
          <button type="submit">Login</button>
        </div>
        <div>
          <span className="register-text">Don't have an account?</span>
          <span className="register">
            <Link to="/register">Register</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
