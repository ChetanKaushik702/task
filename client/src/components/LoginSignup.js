import { Fragment, useRef, useState } from "react";
import "./LoginSignup.css";
import { useNavigate } from "react-router";
import axios from "axios";

const LoginSignup = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const loginSubmit = (e) => {
    e.preventDefault();
    async function login() {
      const res = await axios.post(
        "https://ck-ibrat-task-backend.onrender.com/api/v1/user/login",
        {
          email: loginEmail,
          password: loginPassword,
        }
      );
      if (res.data.success) {
        console.log(res.data);
        setUserId(res.data.user._id);
        navigate(`/home/${res.data.user._id}`);
      }
    }
    login();
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    async function register() {
      const res = await axios.post(
        "https://ck-ibrat-task-backend.onrender.com/api/v1/user/register",
        {
          email: user.email,
          name: user.name,
          password: user.password,
        }
      );
      if (res.data.success) {
        console.log(res.data);
        setUserId(res.data.user._id);
        navigate(`/home/${res.data.user._id}`);
      }
    }
    register();
  };

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }

    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      <div className="loginSignupContainer">
        <div className="loginSignupBox">
          <div>
            <div className="login-signup-toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <input type="submit" value="Login" className="loginBtn" />
          </form>
          <form
            className="signupForm"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <div className="signupName">
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
            <div className="signupEmail">
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="signupPassword">
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <input type="submit" value="Register" className="signupBtn" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default LoginSignup;
