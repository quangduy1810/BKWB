import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
    const isAuth = localStorage.getItem('isAuth');

    return (
        <Route
            {...restOfProps}
            render={(props) => 
                isAuth ? <Component {...props} /> : <Redirect to= '/' />
            }
        />
    );
}

export default ProtectedRoute;