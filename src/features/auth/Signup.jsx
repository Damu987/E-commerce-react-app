import { useRef, useState, useEffect } from "react";
import { BiUser, BiLock, BiShow, BiHide, BiCheckCircle, BiXCircle, BiInfoCircle, BiLogIn } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Signup() {
  const userRef = useRef();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [showMatchPwd, setShowMatchPwd] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => userRef.current.focus(), []);
  useEffect(() => setValidName(USER_REGEX.test(user)), [user]);
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);
  useEffect(() => setErrMsg(""), [user, pwd, matchPwd]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validName || !validPwd || !validMatch) return setErrMsg("Invalid input");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.user === user)) return setErrMsg("Username already taken");

    localStorage.setItem("users", JSON.stringify([...users, { user, pwd }]));
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <form className="signup-card" onSubmit={handleSubmit}>
        <h2 className="signup-header">Sign Up</h2>
        {errMsg && <p className="error">{errMsg}</p>}

        {/* Username */}
        <div className="input-group">
          <label>Username</label>
          <div className="input-icon">
            <BiUser className="icon-left" />
            <input
              type="text"
              ref={userRef}
              value={user}
              onChange={(e) => setUser(e.target.value)}
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              placeholder="Enter username"
              required
            />
            {validName && <BiCheckCircle className="icon-right valid" />}
            {!validName && user && <BiXCircle className="icon-right invalid" />}
          </div>
          {userFocus && user && !validName && (
            <small><BiInfoCircle /> 4–24 chars, start with letter</small>
          )}
        </div>

        {/* Password */}
        <div className="input-group">
          <label>Password</label>
          <div className="input-icon">
            <BiLock className="icon-left" />
            <input
              type={showPwd ? "text" : "password"}
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              placeholder="Enter password"
              required
            />
            <span className="icon-right toggle" onClick={() => setShowPwd(!showPwd)}>
              {showPwd ? <BiHide /> : <BiShow />}
            </span>
            {validPwd && <BiCheckCircle className="icon-right valid check" />}
            {!validPwd && pwd && <BiXCircle className="icon-right invalid check" />}
          </div>
          {pwdFocus && !validPwd && (
            <small>8–24 chars, uppercase, lowercase, number & symbol</small>
          )}
        </div>

        {/* Confirm Password */}
        <div className="input-group">
          <label>Confirm Password</label>
          <div className="input-icon">
            <BiLock className="icon-left" />
            <input
              type={showMatchPwd ? "text" : "password"}
              value={matchPwd}
              onChange={(e) => setMatchPwd(e.target.value)}
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              placeholder="Confirm password"
              required
            />
            <span className="icon-right toggle" onClick={() => setShowMatchPwd(!showMatchPwd)}>
              {showMatchPwd ? <BiHide /> : <BiShow />}
            </span>
            {validMatch && <BiCheckCircle className="icon-right valid check" />}
            {!validMatch && matchPwd && <BiXCircle className="icon-right invalid check" />}
          </div>
          {matchFocus && !validMatch && <small>Must match password</small>}
        </div>

        <button className="signup-button" disabled={!validName || !validPwd || !validMatch}>
          <BiLogIn className="btn-icon" /> Sign Up
        </button>

        <p className="signin-link">
          Already registered? <Link to="/signin">Sign In</Link>
        </p>
      </form>
    </div>
  );
}