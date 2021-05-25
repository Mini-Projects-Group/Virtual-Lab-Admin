import React, { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';

const AuthPages = () => {
  const [user, setUser]: any = useState(null);

  useEffect(() =>{
    let token: any = localStorage.getItem('vl-token');
    let decoded = jwt_decode(token);
    setUser(decoded as any);
  },[])

  return <div>
    Auth Page 1

    { user && <div>Logged In as: {user?.username}</div>}
    </div>;
};

export default AuthPages;
