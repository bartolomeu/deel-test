import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import AppContext from "./appContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContext>
      <RouterProvider router={routes} />
    </AppContext>
  </React.StrictMode>
);
