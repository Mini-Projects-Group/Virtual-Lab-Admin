import React from "react";
import { Switch } from "react-router-dom";
import "./App.css";
import AuthPages from "./components/AuthPages";
import StaticPages from "./components/StaticPages";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path='/auth' component={AuthPages} />
          <PublicRoute path='/' component={StaticPages} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
