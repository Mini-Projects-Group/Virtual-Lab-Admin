import React, { useEffect } from "react";
import { useHistory } from "react-router";

const StaticPages = () => {
  const history = useHistory();

  useEffect(() => {
    let adminToken: String | null = localStorage.getItem('vl-token');

    if(!adminToken) 
      history.push('/login');
  },[]);
  return <div>Admin Landing Page</div>;
};

export default StaticPages;
