import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { Provider } from "react-redux";
import combineReducer from "./stores/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={combineReducer}>
    <App />
  </Provider>
);
