import { useSelector } from 'react-redux';
import { Navigate} from 'react-router-dom';
import { RootState } from '../store/store';


export const PrivateRoute = (props:any) => {

    const {uid,area} = useSelector( (state:RootState) => state.auth );
    //if user is logged in, redirect to home
    if(uid&&area?.nombre==='admin'){
        return <Navigate to="/agenda/admin/"/>
    }


    return uid ? props.children : <Navigate to="/" />;
}
