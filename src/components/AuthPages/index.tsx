import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Button } from "antd";
import { useHistory } from "react-router";

const AuthPages = () => {
  const [user, setUser]: any = useState(null);
  const history = useHistory();

  useEffect(() => {
    let token: any = localStorage.getItem("vl-token");
    let decoded = jwt_decode(token);
    setUser(decoded as any);
  }, []);

  const studentDashboard = () => {
    history.push("/sdashboard");
  };
  const facultyDashboard = () => {
    history.push("/fdashboard");
  };
  const logout = () => {
    localStorage.removeItem("vl-token");
    history.push("/");
  };

  return (
    <div>
      1
      {user && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button onClick={studentDashboard} type="primary">
            Student Dashboard
          </Button>
          <Button onClick={facultyDashboard} type="primary">
            Faculty Dashboard
          </Button>
          <Button onClick={() => history.push('/ldashboard')} type="primary">
            Lab Dashboard
          </Button>
          <Button onClick={logout}>Logout</Button>
        </div>
      )}
    </div>
  );
};

export default AuthPages;
