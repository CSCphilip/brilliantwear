import { useState } from "react";

import AuthService from "../services/auth.service";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    AuthService.register(username, email, password).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center register-main-container"
      style={{ backgroundImage: 'url("register-background.jpeg")' }}
    >
      <div className="d-flex flex-column align-items-center bg-light register-focus-container">
        <h1 className="register-heading">Register</h1>

        <form className="text-center register-form" onSubmit={handleSubmit}>
          {!successful && (
            <div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={onChangeUsername}
                  minLength={3}
                  max={20}
                  required
                />
              </div>

              <div className="form-group sign-in-input-padding">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={onChangeEmail}
                  minLength={5}
                  maxLength={50}
                  required
                />
              </div>

              <div className="form-group sign-in-input-padding">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={onChangePassword}
                  minLength={14}
                  maxLength={100}
                  required
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary sign-up-btn" type="submit">
                  Sign Up
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
