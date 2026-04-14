import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { BiUser, BiLock, BiShow, BiHide, BiLogIn } from "react-icons/bi";
import "./Signup.css";

export default function Signin() {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const errRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find((u) => u.user === user && u.pwd === pwd);

    if (!validUser) {
      setErrMsg("Invalid username or password");
      errRef.current.focus();
      return;
    }

    login(validUser);
    navigate("/");
  };

  return (
    <section className="auth-container">
      <div className="signin-card">
        <h1 className="signin-header">Sign In</h1>

        {/* Error message */}
        {errMsg && (
          <p ref={errRef} className="errmsg" aria-live="assertive">
            {errMsg}
          </p>
        )}

        <form onSubmit={handleLogin}>
          {/* Username */}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <div className="input-icon">
              <input
                type="text"
                id="username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
              <BiUser className="icon-left" />
            </div>
          </div>

          {/* Password */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-icon">
              <input
                type={showPwd ? "text" : "password"}
                id="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                required
              />
              <BiLock className="icon-left" />
              {showPwd ? (
                <BiHide
                  className="icon-right"
                  onClick={() => setShowPwd(false)}
                />
              ) : (
                <BiShow
                  className="icon-right"
                  onClick={() => setShowPwd(true)}
                />
              )}
            </div>
          </div>

          <button type="submit" className="signin-btn">
            <BiLogIn className="btn-icon" />
            Sign In
          </button>
        </form>

        <p className="signin-link">
          New user? <Link to="/signup">Create Account</Link>
        </p>
      </div>
    </section>
  );
}