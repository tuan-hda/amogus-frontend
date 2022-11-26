import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { BrowserRouter as Router } from "react-router-dom";

const theme = createTheme({
  type: "light",
  theme: {
    fonts: {
      sans: "Lexend Deca, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
    },
    breakpoints: {
      medium: "1024px",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NextUIProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </NextUIProvider>
  </React.StrictMode>
);
