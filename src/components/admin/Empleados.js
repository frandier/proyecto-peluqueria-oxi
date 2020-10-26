import React from 'react'
import { useDispatch } from 'react-redux';
import { createNewEmpleado } from '../../actions/empleados';
import { useForm } from '../../hooks/useForm'
import NavbarAdmin from './NavbarAdmin'

export default function Empleados() {

    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
        name: "",
        lastname: "",
        especialidad: ""
    });

    const {name, lastname, especialidad} = formValues;

    const handleEmpleado = (e) => {
        e.preventDefault();
        dispatch(createNewEmpleado(name, lastname, especialidad));
    }

    return (
        <>
            <NavbarAdmin/>
            <div className="row">
                <div className="col-md-4 mx-auto">
                    <div className="card mt-4">
                        <div className="card-header text-center">
                            <h4>Agregar Empleado</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleEmpleado}>
                                <div className="form-group">
                                    <label htmlFor="nombre-empleado">Nombre del Empleado</label>
                                    <input type="text" name="name" className="form-control" value={name} onChange={handleInputChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="apellido-empleado">Apellido del Empleado</label>
                                    <input type="text" name="lastname" className="form-control" value={lastname} onChange={handleInputChange}/> 
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nombre-servicio">Especialidad</label>
                                    <select className="form-control" value={especialidad} onChange={handleInputChange} name="especialidad">
                                        <option value="">Seleccione</option>
                                        <option value="estilista">Estilista</option>
                                        <option value="manicurista">Manicurista</option>
                                        <option value="integral">Integral</option>
                                    </select>
                                </div>
                                <button className="btn btn-primary btn-block">
                                    Agregar Empleado
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
