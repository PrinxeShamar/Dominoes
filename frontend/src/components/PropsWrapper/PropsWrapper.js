import React from "react";
import {useParams, useLocation, useNavigate, useSearchParams, Navigate} from "react-router-dom";

export function withRouter(C) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    return (<C {...props} router={{location, navigate, params, searchParams}}/>);
  }

  return ComponentWithRouterProp;
}

export function privateComponent(C) {
  function PrivateComponent(props) {
    let isLoggedIn = localStorage.getItem("dominosLoggedIn") === "true";
    if (props.private === true) {
      if (isLoggedIn) {
        return (<C {...props}/>);
      } else {
        return <Navigate to={'/login'}/>
      }
    } else if (props.private === false) {
      if (!isLoggedIn) {
        return (<C {...props}/>);
      } else {
        return <Navigate to={'/'}/>
      }
    }
  }

  return PrivateComponent;
}
