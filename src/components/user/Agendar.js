import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createNewCita } from '../../actions/citas';
import { startLoadingEmpleados } from '../../actions/empleados';
import { startLoadingServicios } from '../../actions/servicios';
import { useForm } from '../../hooks/useForm'

export default function Agendar() {

    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
        servicio: "",
        empleado: "",
        dia: "",
        hora: "",
    });

    const {servicio, empleado, dia, hora} = formValues;  

    useEffect(() => {
        dispatch(startLoadingEmpleados())
        dispatch(startLoadingServicios())
    }, [dispatch])


    const {empleados} = useSelector(state => state.empleados);
    const {servicios} = useSelector(state => state.servicios);

    const handleAgendar = (e) => {
        e.preventDefault();
        dispatch(createNewCita(servicio, empleado, dia, hora));
    }

    return (
        <div className="row">
            <div className="col-md-4 mx-auto">
                <div className="card mt-4">
                    <div className="card-header textcenter">
                        <h4>Agendar Cita</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleAgendar}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="nombre-servicio">Nombre del servicio</label>
                                    <select className="form-control" value={servicio} onChange={handleInputChange} name="servicio">
                                        <option value="">Seleccione</option>
                                        {servicios.map(servicio => (
                                            <option value={servicio.nombre} key={servicio.id}>{servicio.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="nombre-empleado">Nombre del empleado</label>
                                    <select className="form-control" value={empleado} onChange={handleInputChange} name="empleado">
                                        <option value="">Seleccione</option>
                                        {empleados.map(empleado => (
                                            <option value={empleado.nombre} key={empleado.id}>{empleado.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="dia">Dia</label>
                                    <input className="form-control" value={dia} onChange={handleInputChange} type="date" name="dia"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="hora">Hora</label>
                                    <input className="form-control" value={hora} onChange={handleInputChange} type="time" name="hora"/>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">
                                    Agendar
                                </button>
                                {/* <div className="form-group col-md-6">
                                    <button type="submit" className="btn btn-primary btn-block">
                                        Agendar
                                    </button>
                                </div>
                                <div className="form-group col-md-6">
                                    <button type="reset" className="btn btn-danger btn-block">
                                        Cancelar
                                    </button>
                                </div> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
