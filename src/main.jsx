import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {Provider} from 'react-redux'
import { store } from "./store/store.js";
import { AuthProvider } from './contexts/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
  <Provider store={store}>
    <App />
  </Provider>
  </AuthProvider>
);
