import { Navigate } from "react-router-dom";

export const NotAuthenticated = ({ children }) => {

    const a_t_l_p = sessionStorage.getItem("a_t_l_p");
    return (!a_t_l_p) ? children : <Navigate to='/tracker' />
}


