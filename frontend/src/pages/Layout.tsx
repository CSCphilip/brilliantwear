import Favicon from "react-favicon";
import { Link, Outlet } from "react-router-dom";

import LogIn from "../components/LogIn";

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
            <a
              className="btn btn-success dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Log In
            </a>
            <ul className="dropdown-menu dropdown-menu-end custom-dropdown-width">
              <li>
                <LogIn />
              </li>
              <li>
                <div className="dropdown-divider custom-divider" />
              </li>
              <li>
                <Link to="/register" className="dropdown-item">
                  New around here? Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
