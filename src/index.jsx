import React from "react";
import ReactDOM from "react-dom/client"; // Note: import from "react-dom/client" instead of "react-dom"
import "./index.css";
import App from "./App.jsx";
import registerServiceWorker from "./registerServiceWorker";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

registerServiceWorker();