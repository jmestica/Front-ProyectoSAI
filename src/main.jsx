import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./customHooks/AuthProvider.jsx";
import { PrintProvider } from "./customHooks/PrintContext.jsx";
import { DrawerProvider } from "./customHooks/DrawerContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <PrintProvider>
        <DrawerProvider>
          <App />
        </DrawerProvider>
      </PrintProvider>
    </AuthProvider>
  </React.StrictMode>
);
