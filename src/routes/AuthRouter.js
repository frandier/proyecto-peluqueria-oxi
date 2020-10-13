import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import SignIn from '../components/auth/SignIn'
import SignUp from '../components/auth/SignUp'


export function AuthRouter() {
    return (
        <Switch>
            <Route 
                exact
                path="/auth/login"
                component={SignIn}
            />

            <Route 
                exact
                path="/auth/register"
                component={SignUp}
            />

            <Redirect to="/" />
        </Switch>
    )
}
