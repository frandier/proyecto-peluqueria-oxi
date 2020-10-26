import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startLogout } from '../../actions/auth';

import logo from '../../dre.png';

export default function Navbar() {

    const dispatch = useDispatch();

    const {name} =  useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(startLogout())
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <img src={logo} width="50" height="50" alt="" className="d-inline-block align-midle"/>
                    Belleza Integral OXI
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        {
                            !name && 
                            (
                                <>
                                    <li className="nav-item">
                                        <Link to="/auth/login" className="nav-link">Iniciar</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/auth/register" className="nav-link">Registrar</Link>
                                    </li>
                                </>
                            )
                        }
                        {
                            name && 
                            (
                                <>
                                    <li className="nav-item">
                                        <span className="nav-link">{name}</span>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/user/agendar" className="nav-link">Agendar</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button 
                                            className="btn nav-link"
                                            onClick={handleLogout}
                                        >Cerrar sesion</button>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}
