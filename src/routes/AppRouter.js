import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { login } from '../actions/auth'
import { firebase } from '../firebase/firebase-config'

import { AuthRouter } from './AuthRouter'
import UserRouter from './UserRouter'
import AdminRouter from './AdminRouter'

import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { PrivateAdmin } from './PrivateAdmin'

import Home from '../components/layout/Home'
import Navbar from '../components/layout/Navbar'



export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {

        firebase.auth().onAuthStateChanged((user) => {

            if (user?.uid) {

                user.getIdTokenResult().then(idTokenResult => {
                    user.admin = idTokenResult.claims.admin;
                    dispatch(login(user.uid, user.displayName, user.admin));
                    if (user.admin) {
                        setIsAdmin(true)
                    }
                });
                
                setIsLoggedIn(true); 
            } else {
                setIsLoggedIn(false);
                setIsAdmin(false);
            }

            setChecking(false);

        });

    }, [dispatch, setChecking, setIsLoggedIn])

    if (checking) {
        return (
            <h1>Espere...</h1>
        )
    }

    return (
        <Router>
            <Navbar/>
            <Switch>
                <Route
                    exact
                    path="/"
                    component={Home}
                />
                <PublicRoute
                    path="/auth"
                    component={AuthRouter}
                    isAuthenticated={ isLoggedIn }
                    isAdmin={isAdmin}
                />
                <PrivateRoute
                    isAdmin={isAdmin}
                    isAuthenticated={ isLoggedIn }
                    path="/user"
                    component={UserRouter}
                />
                <PrivateAdmin 
                    path="/admin"
                    component={AdminRouter}
                    isAdmin={isAdmin}
                    isAuthenticated={ isLoggedIn }
                />
                <Route
                    path="/admin"
                    component={AdminRouter}
                />

                <Redirect to="/" />
            </Switch>
        </Router>
    )
}