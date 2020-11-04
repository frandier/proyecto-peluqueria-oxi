import React from 'react'
import { Link } from 'react-router-dom'

export default function NavbarAdmin() {
    return (
        <div className="container mt-2">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item" aria-current="page"><Link to="/admin/citas">Citas</Link></li>
                    <li className="breadcrumb-item active" aria-current="page"><Link to="/admin/servicios">Servicios</Link></li>
                    <li className="breadcrumb-item active" aria-current="page"><Link to="/admin/empleados">Empleados</Link></li>
                    <li className="breadcrumb-item active" aria-current="page"><Link to="/admin/addadmin">Añadir</Link></li>
                </ol>
            </nav>
        </div>
    )
}
