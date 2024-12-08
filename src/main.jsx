import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "flowbite";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
  // <React.StrictMode>
  //   <RouterProvider router={router} />

  // </React.StrictMode>
);
