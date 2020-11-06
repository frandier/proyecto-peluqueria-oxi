import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Servicios() {

    const {servicios} = useSelector(state => state.servicios);
    
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
                            <Link to="/" className="btn btn-primary">Agendar</Link>
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
