import Favicon from "react-favicon";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Favicon url="public/favicon.ico" />

      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="/">
          <img src="/public/logo.png" alt="Brilliantwear" />
        </a>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-links"
            aria-controls="navbar-links"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar-links">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/shopping-assistant" className="nav-link">
                  Shopping assistant
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/product-upload" className="nav-link">
                  Upload product
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  More
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="#" className="dropdown-item">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="dropdown-item">
                      Contact
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="dropdown">
            <button
              type="button"
              className="btn btn-success dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="outside"
            >
              Log In
            </button>
            <form className="dropdown-menu p-4 dropdown-menu-end custom-dropdown-width">
              <div className="mb-3">
                <label
                  htmlFor="exampleDropdownFormEmail2"
                  className="form-label"
                >
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleDropdownFormEmail2"
                  placeholder="email@example.com"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleDropdownFormPassword2"
                  className="form-label"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleDropdownFormPassword2"
                  placeholder="Password"
                />
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="dropdownCheck2"
                  />
                  <label className="form-check-label" htmlFor="dropdownCheck2">
                    Remember me
                  </label>
                </div>
              </div>
              <button type="submit" className="btn btn-success">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
