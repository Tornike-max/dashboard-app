import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ContextProvider from "./contexts/ContextProvider.tsx";
import { Toaster } from "react-hot-toast";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ColorsContext from "./contexts/ColorsContext.tsx";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ContextProvider>
      <ColorsContext>
        <NextUIProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Toaster />
            <App />
          </LocalizationProvider>
        </NextUIProvider>
      </ColorsContext>
    </ContextProvider>
  </React.StrictMode>
);
