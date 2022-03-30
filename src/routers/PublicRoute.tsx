import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from '../store/store';

export const PublicRoute = (props:any) => {
    const {uid} = useSelector( (state:RootState) => state.auth );
    //if user is logged in, redirect to home
    return uid ? <Navigate to="/agenda" /> : props.children;

}
