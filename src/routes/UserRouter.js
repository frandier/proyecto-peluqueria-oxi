import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Agendar from '../components/user/Agendar'

export default function UserRouter() {
    return (
        <Switch>
            <Route 
                exact
                path="/user/agendar"
                component={Agendar}
            />
        </Switch>
    )
}

