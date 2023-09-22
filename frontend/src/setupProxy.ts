import { createProxyMiddleware } from "http-proxy-middleware";
import { Express } from "express";

module.exports = function (app: Express) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};

// frontend port: 5173
// backend port: 80
// proxy port: 5000
