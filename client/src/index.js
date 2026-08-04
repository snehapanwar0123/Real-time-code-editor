import React from "react";
import ReactDOM from "react-dom/client";
import 'react-toastify/dist/ReactToastify.css';

import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";

import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <>
    <Toaster />
    <App />
  </>
);