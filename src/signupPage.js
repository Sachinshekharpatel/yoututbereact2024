import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SignupPage = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (
      password === confirmPassword &&
      password.length > 5 &&
      email.includes("@")
    ) {
      const data = {
        email: email,
        password: password,
        returnSecureToken: true,
      };

      // console.log(data);

      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCptE9QtAawOyBKdjmzWWZM5PegYF0W-g0",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("User signed up successfully:", response.data);
          // navigate("/loginpage");
        })
        .catch((error) => {
          console.error("Error signing up user:", error.response.data.error);
        });
      emailRef.current.value = "";
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
    } else {
      alert("Please enter valid credentials");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-header">
              <h4>Sign Up</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    ref={emailRef}
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    ref={passwordRef}
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    ref={confirmPasswordRef}
                    placeholder="Confirm Password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-2"
                >
                  Sign Up
                </button>
                <div>
                  Already have an account?
                  <Link to="/loginpage"> Login here</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
