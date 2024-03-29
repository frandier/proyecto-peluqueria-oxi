import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';


export const PrivateRoute = ({
    isAuthenticated,
    isAdmin,
    component: Component,
    ...rest
}) => {

    return (
        <Route { ...rest }
            component={ (props) => (
                ( isAuthenticated === true && isAdmin === false)
                    ? ( <Component { ...props } /> )
                    : ( <Redirect to="/auth/login" /> )
            )}
        
        />
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
