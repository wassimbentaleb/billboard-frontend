import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Auth from "./components/Auth/auth"
import { BrowserRouter } from "react-router-dom";

function Main() {


  const connected = localStorage.getItem("token") != "null";
  return (
    
      <div >
      {connected ? <App /> : <Auth />}
      </div>
    
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </React.StrictMode>
);
