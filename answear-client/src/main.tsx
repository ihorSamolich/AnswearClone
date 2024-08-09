import { store } from "app/store.ts";
import "css/index.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ThemeProvider from "utils/contexts/ThemeContext.tsx";

import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {GOOGLE_CLIENT_ID} from "utils/envData.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Provider store={store}>
        <Router>
            <ThemeProvider>
                <App />
                <ToastContainer />
            </ThemeProvider>
        </Router>
    </Provider>
    </GoogleOAuthProvider>
);
