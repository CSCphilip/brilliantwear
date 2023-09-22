import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthService from "../services/auth.service";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

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
    setLoading(true);

    AuthService.login(email, password).then(
      () => {
        navigate("/profile");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <form className="px-4 py-3" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleDropdownFormEmail2" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          id="exampleDropdownFormEmail2"
          placeholder="email@example.com"
          value={email}
          onChange={onChangeEmail}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleDropdownFormPassword2" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          id="exampleDropdownFormPassword2"
          placeholder="Password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <div className="mb-3">
        <button className="btn btn-success" disabled={loading} type="submit">
          {loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          <span>Log In</span>
        </button>
      </div>

      {message && (
        <div className="mb-3">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
    </form>
  );
};

export default LogIn;
