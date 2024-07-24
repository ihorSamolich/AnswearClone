import "css/index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeProvider from "utils/contexts/ThemeContext.tsx";

import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Router>,
);
