import { useState } from "react";
import "./Login.css";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogIn } from "../../action/AuthAction";

export const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const usernameChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();

    dispatch(LogIn(user, navigate));
  };

  return (
    <div className="login-main-container">
      <form className="Login-form-container" onSubmit={submitForm}>
        <div className="login-img-con">
          <img
            style={{ width: "150px" }}
            src="https://www.brihaspathi.com/img/logo/logo.png"
            alt=""
          />
        </div>
        <div className="login-username-container">
          <input
            onChange={usernameChange}
            id="usename"
            type="text"
            name="username"
            placeholder="User Name"
            value={user.username}
            required
          />

          <FaUserAlt color="white" />
        </div>
        <div className="login-username-container">
          <input
            onChange={usernameChange}
            id="usename"
            type="text"
            name="password"
            value={user.password}
            placeholder="Password"
            required
          />

          <FaLock color="white" />
        </div>
        <button className="login-btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
