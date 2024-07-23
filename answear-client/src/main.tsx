import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import * as React from "react";

import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>,
);
