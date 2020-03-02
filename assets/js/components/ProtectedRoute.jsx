import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const ProtectedRoute  = ({ path, component }) => {
    
    const { isAuthenticated } = useContext(AuthContext);
    return  isAuthenticated ?(
        <Route path={path} component={component} />
    ) : (
        <Redirect to="/login" />
    );
}
 
export default ProtectedRoute;