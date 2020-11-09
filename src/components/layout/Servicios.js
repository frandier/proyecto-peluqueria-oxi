import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startDeleting } from '../../actions/servicios';

export default function Servicios() {

    const dispatch = useDispatch();

    const {servicios} = useSelector(state => state.servicios);
    const {admin} = useSelector(state => state.auth);

    const eliminarServicio = id => {
        dispatch(startDeleting(id));
    }
    
    const serviciosList = servicios.length ? (
        servicios.map(servicio => {
            return (
                <div className="col-md-4 mb-5" key={servicio.id}>
                    <div className="card h-100">
                        <img className="card-img-top" src={servicio.imageUrl} alt=""/>
                        <div className="card-body">
                            <h5 className="card-title">{servicio.nombre}</h5>
                            <p className="card-text">Area: {servicio.area}</p>
                            <p className="card-text">Precio: {servicio.precio}</p>
                            {
                                !admin &&
                                (
                                    <Link to="/user/agendar" className="btn btn-primary">Agendar</Link>
                                )
                            }
                            {
                                admin &&
                                (
                                    <button className="btn btn-danger" onClick={() => {eliminarServicio(servicio.id)}}>Eliminar</button>
                                )
                            }
                        </div>
                    </div>
                </div>
            )
        })
    ) : (
        <p className="text-center">No hay servicios para mostrar</p>
    )

    return (
        <div className="row">
            {serviciosList}
        </div>
    )
}
