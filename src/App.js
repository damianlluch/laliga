import React from "react";
import { Router } from "react-router-dom";
import { Routes } from "./index";
import { UserProvider } from "./context/user.context";
import { createBrowserHistory } from "history";
const browserHistory = createBrowserHistory();

function App() {
  return (
    <React.Fragment>
      <UserProvider>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </UserProvider>
    </React.Fragment>
  );
}

export default App;
