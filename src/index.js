import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MatrixProvider } from './context/matrixContextAPI';
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <MatrixProvider>
    <App />
  </MatrixProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
