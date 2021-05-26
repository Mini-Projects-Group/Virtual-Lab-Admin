import React, { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import { Button } from "antd";
import { useHistory } from "react-router";

const AuthPages = () => {
  const [user, setUser]: any = useState(null);
  const history = useHistory();

  useEffect(() =>{
    let token: any = localStorage.getItem('vl-token');
    let decoded = jwt_decode(token);
    setUser(decoded as any);
  },[])

  const logout = () => {
    localStorage.removeItem('vl-token');
    history.push('/');
  }

  return <div>
    Auth Page 1

    { user && 
      <div>
        Logged In as: {user?.username} <br />
        <Button onClick={logout}>Logout</Button>
      </div>
    }
    </div>;
};

export default AuthPages;
