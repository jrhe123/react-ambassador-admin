import React from "react";
import "./Login.css";

function Login() {
  return (
    <div>
      <form className="form-signin">
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label className="sr-only">Email address</label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required
        />
        <label className="sr-only">Password</label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
        />

        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}

export default Login;
