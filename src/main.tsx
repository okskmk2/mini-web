import "./assets/styles/index.css";

import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./router.tsx";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
