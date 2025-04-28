import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ErrorBoundary } from "react-error-boundary";

const GOOGLE_CLIENT_ID =
  "826437202548-fj078fp80th3bchs3jtn3nve1q2pcu7d.apps.googleusercontent.com";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(

    <Provider store={store}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Router>
          <PersistGate loading={null} persistor={persistor}>
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
              <App />
            </ErrorBoundary>
          </PersistGate>
        </Router>
      </GoogleOAuthProvider>
    </Provider>

);
