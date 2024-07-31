import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="753066882922-c397bo2a9elph2o54pdbjgmfsl0dqlak.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
