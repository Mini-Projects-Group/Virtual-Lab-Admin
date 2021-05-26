import React from "react";
import { Switch } from "react-router-dom";
import "./App.css";
import AuthPages from "./components/AuthPages";
import StaticPages from "./components/StaticPages";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { BrowserRouter } from "react-router-dom";
import Login from "./components/Login/Login";
import StudentDashboard from "./components/StudentDashboard/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard/TeacherDashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/sdashboard" component={StudentDashboard} />
          <PrivateRoute exact path="/fdashboard" component={TeacherDashboard} />
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute path="/" component={StaticPages} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
