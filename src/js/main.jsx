import React from "react";
import ReactDOM from "react-dom/client";

import "../styles/index.css";

// components
import { App } from "./components/App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
