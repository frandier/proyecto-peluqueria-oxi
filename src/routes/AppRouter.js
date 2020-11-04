import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from 'react-router-dom'

import { useDispatch } from 'react-redux'

import Home from '../components/layout/Home'
import Navbar from '../components/layout/Navbar'

import { firebase } from '../firebase/firebase-config'
import { AuthRouter } from './AuthRouter'
import { PrivateRoute } from './PrivateRoute'

import { login } from '../actions/auth'
import UserRouter from './UserRouter'
import { PublicRoute } from './PublicRoute'
import AdminRouter from './AdminRouter'


export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        firebase.auth().onAuthStateChanged((user) => {

            if (user?.uid) {

                user.getIdTokenResult().then(idTokenResult => {
                    user.admin = idTokenResult.claims.admin;
                    console.log(user);
                });


                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
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
                />
                <PrivateRoute
                    isAuthenticated={ isLoggedIn }
                    path="/user"
                    component={UserRouter}
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