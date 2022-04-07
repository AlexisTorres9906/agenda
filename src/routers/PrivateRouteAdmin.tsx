import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";

export const PrivateRouteAdmin = (props:any) => {
    const {uid,area} = useSelector( (state:RootState) => state.auth );
    //if user is logged in, redirect to home
    return uid&&area?.nombre==='admin' ? props.children : <Navigate to="/" />;
}
