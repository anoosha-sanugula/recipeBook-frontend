import React from "react";
import "./Register.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "../../types/User";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();

  const registerUser: SubmitHandler<User> = async (user: any) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        localStorage.setItem("userdata", JSON.stringify(user));
        navigate("/home");
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
    <div className="register-container">
      <form onSubmit={handleSubmit(registerUser)}>
        <h3>Register Here!</h3>
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
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            id="email"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid.",
              },
            })}
          />
          {errors.email && <p className="errorMsg">Email is not valid</p>}
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
          <label htmlFor="country">Country: </label>
          <input type="text" id="country" {...register("country")} />
        </div>
        <div className="form-control">
          <button type="submit">Register</button>
        </div>
        <div>
          <span className="login-text">Already have an account?</span>
          <span className="login">
            <Link to="/login">Login</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
