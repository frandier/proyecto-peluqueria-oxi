import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startDeleting } from '../../actions/empleados';

export default function Empleados() {

    const dispatch = useDispatch();

    const {empleados} = useSelector(state => state.empleados);
    const {admin} = useSelector(state => state.auth);

    const deleteEmpleado = id => {
        dispatch(startDeleting(id));
    }

    const empleadosList = empleados.length ? (
        
        empleados.map(empleado => {
            return (
                <div className="col-md-4 mb-5" key={empleado.id}>
                    <div className="card h-100">                                                                                       
                        <img className="card-img-top" src={empleado.imgUrl} alt="empleado"/>
                        <div className="card-body">
                            <h5 className="card-title">{empleado.nombre} {empleado.apellido}</h5>
                            <p className="card-text">Especialidad: {empleado.especialidad}</p>
                            <p className="card-text">Descripción: {empleado.descripcion}</p>
                            {
                                admin &&
                                (
                                    <button className="btn btn-danger" onClick={() => {deleteEmpleado(empleado.id)}}>Eliminar</button>
                                )
                            }
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
