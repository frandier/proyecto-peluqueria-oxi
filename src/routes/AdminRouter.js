import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AddAdmin from '../components/admin/AddAdmin'
import Citas from '../components/admin/Citas'
import Empleados from '../components/admin/Empleados'
import Servicios from '../components/admin/Servicios'

export default function AdminRouter() {
    return (
        <Switch>
            <Route
                exact
                path="/admin/citas"
                component={Citas}
            />
            <Route
                exact
                path="/admin/servicios"
                component={Servicios} 
            />
            <Route
                exact
                path="/admin/empleados"
                component={Empleados} 
            />
            <Route 
                exact
                path="/admin/addadmin"
                component={AddAdmin}
            />
        </Switch>
    )
}
