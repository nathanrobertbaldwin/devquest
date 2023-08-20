import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createUserSavesThunk, getUserSavesThunk } from "../../store/saves";
import { login } from "../../store/session";
import { signUp } from "../../store/session";
import "../../styles/AccountForms.css";

export default function AccountFormsModal() {
  const dispatch = useDispatch();

  // Login Form
  const [emailLIF, setEmailLIF] = useState("");
  const [passwordLIF, setPasswordLIF] = useState("");
  const [errorsLIF, setErrorsLIF] = useState([]);
  const { closeModal } = useModal();

  // Sign Up

  const [emailSUF, setEmailSUF] = useState("");
  const [usernameSUF, setUsernameSUF] = useState("");
  const [passwordSUF, setPasswordSUF] = useState("");
  const [confirmPasswordSUF, setConfirmPasswordSUF] = useState("");
  const [errorsSUF, setErrorsSUF] = useState([]);

  // Login Form
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(emailLIF, passwordLIF));
    if (data) {
      setErrorsLIF(data);
    } else {
      await dispatch(getUserSavesThunk());
      closeModal();
    }
  };

  // Sign Up

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (passwordSUF === confirmPasswordSUF) {
      const data = await dispatch(signUp(usernameSUF, emailSUF, passwordSUF));
      if (data) {
        setErrorsSUF(data);
      } else {
        await dispatch(createUserSavesThunk());
        closeModal();
      }
    } else {
      setErrorsSUF([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  // Login Form
  const demoLogin = async (user) => {
    await dispatch(login("demo@aa.io", "password"));
    await dispatch(getUserSavesThunk());
    closeModal();
  };

  return (
    // Login Form
    <div id="account-forms-component">
      <div id="account-forms-container">
        <div id="login-form-container">
          <h2 style={{ textAlign: "center" }}>Log In</h2>
          <form id="login-form" onSubmit={handleLoginSubmit}>
            <ul>
              {errorsLIF.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <label>Email</label>
            <input
              type="text"
              value={emailLIF}
              onChange={(e) => setEmailLIF(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              value={passwordLIF}
              onChange={(e) => setPasswordLIF(e.target.value)}
              required
            />
            <div id="login-form-buttons-container">
              <button type="submit">Log In</button>
              <button
                onClick={() => {
                  demoLogin();
                }}
              >
                Demo User
              </button>
            </div>
          </form>
        </div>
        <div id="sign-up-form-container">
          <h2 style={{ textAlign: "center" }}>Sign Up</h2>
          <form id="sign-up-form" onSubmit={handleSignUpSubmit}>
            <ul>
              {errorsSUF.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <label>Email</label>
            <input
              type="text"
              value={emailSUF}
              onChange={(e) => setEmailSUF(e.target.value)}
              required
            />
            <label>Username</label>
            <input
              type="text"
              value={usernameSUF}
              onChange={(e) => setUsernameSUF(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              value={passwordSUF}
              onChange={(e) => setPasswordSUF(e.target.value)}
              required
            />
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPasswordSUF}
              onChange={(e) => setConfirmPasswordSUF(e.target.value)}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}
