import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { Provider as JotaiProvider } from "jotai";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <JotaiProvider>
        <App />
    </JotaiProvider>
);
