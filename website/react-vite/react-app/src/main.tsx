import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import Home from "./pages/Home.tsx";
import ShoppingAssistant from "./pages/ShoppingAssistant.tsx";
import ProductUpload from "./pages/ProductUpload.tsx";

// CSS imports
import "bootstrap/dist/css/bootstrap.css";
import "./css/Layout.css";
import "./css/Home.css";
import "./css/ShoppingAssistant.css";
import "./css/ProductCatalog.css";
import "./css/Product.css";

// Bootstrap JS import (for navbar, making the collapse work)
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The "layout route" is a shared component that inserts common content on all pages, such as a navigation menu. */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shopping-assistant" element={<ShoppingAssistant />} />
          <Route path="product-upload" element={<ProductUpload />} />
          {/* <Route path="*" element={<NoPage />} /> 404 page // TODO: Create 404 page */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);

// Old:
// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
