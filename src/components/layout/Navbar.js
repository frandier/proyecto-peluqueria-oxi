import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { startLogout } from '../../actions/auth';

export default function Navbar(props) {

    const {authenticated} = props;

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(startLogout())
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link to="/" className="navbar-brand">OXI</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        {
                            authenticated === false && 
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
                            authenticated && 
                            (
                                <li className="nav-item">
                                    <button 
                                        className="btn nav-link"
                                        onClick={handleLogout}
                                    >Cerrar sesion</button>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}
