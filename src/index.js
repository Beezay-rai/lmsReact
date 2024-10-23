import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { ErrorBoundary } from "react-error-boundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="826437202548-fj078fp80th3bchs3jtn3nve1q2pcu7d.apps.googleusercontent.com">
      <Router>
        <PersistGate loading={null} persistor={persistor}>
       

          <App />
       
        </PersistGate>
      </Router>
    </GoogleOAuthProvider>
  </Provider>
);
