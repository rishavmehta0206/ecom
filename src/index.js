import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AppReducer from "./context/AppReducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppReducer>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppReducer>
  </React.StrictMode>
);
