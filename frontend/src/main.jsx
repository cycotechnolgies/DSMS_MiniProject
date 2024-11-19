import React from "react";
import { createRoot } from "react-dom/client"; 
import "./index.css";
import App from "@/App.jsx";
import { AuthContextProvider } from "@/context/AuthContext.jsx";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
