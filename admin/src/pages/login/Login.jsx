import React, { useState } from "react";
import { useContext } from "react";
import { login } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    // dispatch actions
    login({ email, password }, dispatch);
  };

  return (
    <div className="login">
      <form action="" className="login-form">
        <input
          type="email"
          name=""
          id=""
          className="login-input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name=""
          id=""
          className="login-input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          disabled={isFetching}
          className="login-btn"
          onClick={(e) => handleLogin(e)}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
