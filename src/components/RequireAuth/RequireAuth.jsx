import { useLocation, Outlet, Navigate } from "react-router-dom";

import useAuth from "../../customHooks/useAuth";

function RequireAuth() {
  const { auth } = useAuth();
  const location = useLocation();
  const a_t_l_p = sessionStorage.getItem("a_t_l_p");

  return auth.accessToken ? (<Outlet />) 
  
  : (a_t_l_p ? ( <Outlet />) 
  : (<Navigate to="/" state={{ from: location }} />) );
}

export default RequireAuth;
