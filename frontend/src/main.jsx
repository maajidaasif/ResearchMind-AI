import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />

    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          background: "#1e293b",
          color: "#fff",
          border: "1px solid #4f46e5",
          borderRadius: "12px",
        },
      }}
    />
  </React.StrictMode>
);