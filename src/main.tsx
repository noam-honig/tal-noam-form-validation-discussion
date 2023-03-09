import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import WithFormik from "./WithFormik";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WithFormik />
  </React.StrictMode>
);
