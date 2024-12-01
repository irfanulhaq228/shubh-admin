import Cookies from 'js-cookie';
import React, { ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import { checkAdminApi } from '../../api/api';
import { useDispatch } from 'react-redux';
import { updateWallet } from '../../features/features';

interface AuthCheckProps {
    children: ReactNode;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const token = Cookies.get('adminToken');
    const [loader, setLoader] = useState(true);

    const fn_checkAdmin = async () => {
        const response = await checkAdminApi();
        if (response?.status) {
            dispatch(updateWallet(response?.data?.wallet))
            if (location.pathname !== "/") {
                if (token) {
                    setLoader(false);
                } else {
                    navigate("/");
                    setLoader(false);
                }
            } else {
                if (token) {
                    navigate("/dashboard");
                    setLoader(false);
                } else {
                    setLoader(false);
                }
            }
        } else {
            navigate("/");
            setLoader(false);
        }
    }

    useEffect(() => {
        setLoader(true);
        fn_checkAdmin();
    }, [location.pathname]);

    if (loader) {
        return <div className='flex justify-center items-center min-h-[100vh]'><Loader color='var(--navy)' size={50} /></div>
    }
    return <>{children}</>;
};

export default AuthCheck;
