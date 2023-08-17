import React from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import { Provider } from "react-redux";
import store from "./redux/store";

import Routes from "./pages/routes";

function App() {
  return (
    <Provider store={store}>
      <CssBaseline>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </CssBaseline>
    </Provider>
  );
}

export default App;
