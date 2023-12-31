//
import { Outlet, Navigate } from 'react-router';
import { useLocation } from 'react-router-dom';

//
import { CheckToken } from '../auth/CheckTokenl';
import LoadingModal from '../component/LoadingModal';


export default function PrivateRoute() {
    const location = useLocation();
    const { isAuth } = CheckToken(location.key);

    if (isAuth === 'Failed') {
        return (
            <Navigate to="/login" state={{from: location}}/>
        )
    } else if (isAuth==='Loading') {
        return <LoadingModal />
    } else if (isAuth==='Success')  {
        return <Outlet />;
    }
    return <Outlet />
}