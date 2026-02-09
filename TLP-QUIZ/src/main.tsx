import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/componentes/app";
import "./styles/global.css"; // se houver estilos globais

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
