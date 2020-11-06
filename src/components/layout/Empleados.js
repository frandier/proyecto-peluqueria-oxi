import React from 'react';
import { useSelector } from 'react-redux';

export default function Empleados() {

    const {empleados} = useSelector(state => state.empleados);

    const empleadosList = empleados.length ? (
        
        empleados.map(empleado => {
            return (
                <div className="col-md-4 mb-5" key={empleado.id}>
                    <div className="card h-100">                                                                                       
                        <img className="card-img-top" src={empleado.imgUrl} alt="empleado"/>
                        <div className="card-body">
                            <h5 className="card-title">{empleado.nombre} {empleado.apellido}</h5>
                            <p className="card-text">Especialidad: {empleado.especialidad}</p>
                        </div>
                    </div>
                </div>
            )
        })
    ) : (
        <p className="text-center">No hay empleados para mostrar</p>
    )    

    return (
        <div className="row">
            {empleadosList}
        </div>
    )
}
