import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import WithFinalForm from "./WithFinalFormFieldLabel";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WithFinalForm />
  </React.StrictMode>
);
