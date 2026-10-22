
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./App.css";

import { registerSW } from "virtual:pwa-register";

registerSW({
  immediate: true,
  onOfflineReady() {
    console.log("Restaurant app is ready for offline use.");
  },
  onRegisterError(error) {
    console.error("Service worker registration failed:", error);
  }
});

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
