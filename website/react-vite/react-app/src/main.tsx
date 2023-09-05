import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

// CSS imports
import "bootstrap/dist/css/bootstrap.css";
import "./css/Product.css";
import "./css/Navbar.css";
import "./css/App.css";

// Bootstrap JS import (for navbar, making the collapse work)
import "bootstrap/dist/js/bootstrap.bundle.min.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
