import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { TenantProvider } from "./context/TenantContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <TenantProvider>
      <App />
    </TenantProvider>
  </AuthProvider>
);