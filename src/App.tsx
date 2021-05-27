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
import LabDashboard from "./components/LabDashboard/LabDashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/auth" component={AuthPages} />
          <PrivateRoute exact path="/sdashboard" component={StudentDashboard} />
          <PrivateRoute exact path="/fdashboard" component={TeacherDashboard} />
          <PrivateRoute exact path="/ldashboard" component={LabDashboard} />
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute path="/" component={StaticPages} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
