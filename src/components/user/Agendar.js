import Swal from "sweetalert2";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import moment from 'moment';

import { createNewCita } from '../../actions/citas';
import { startLoadingEmpleados } from '../../actions/empleados';
import { startLoadingServicios } from '../../actions/servicios';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';
import { consultarFecha, consultarEmpleado } from "../../helpers/citaDisponible";


export default function Agendar() {

    const dispatch = useDispatch();

    const {msgError} = useSelector(state => state.ui);

    const [formValues, handleInputChange, reset] = useForm({
        servicio: "",
        empleado: "",
        fecha: ""
    });

    const {servicio, empleado, fecha} = formValues;

    useEffect(() => {
        dispatch(startLoadingEmpleados())
        dispatch(startLoadingServicios())
    }, [dispatch])


    const {empleados} = useSelector(state => state.empleados);
    const {servicios} = useSelector(state => state.servicios);

    const handleAgendar = async(e) => {
        e.preventDefault();
        if (isFormValid()) {

            const comprobarFecha = await consultarFecha(fecha);
            const comprobarEmpleado = await consultarEmpleado(empleado);

            if (comprobarFecha && comprobarEmpleado) {
                Swal.fire('Empleado ocupado!', 'Por favor seleccione atra fecha o empleado', "error");
            } else {
                dispatch(createNewCita(servicio, empleado, fecha));
                reset();
            }
        }
    }

    const isFormValid = () => {
        const hora = moment(fecha).format('h:mma');

        var inicio = moment(hora, 'h:mma');
        var hApertura = moment('8:00am', 'h:mma');
        var hCierre = moment('9:00pm', 'h:mma');

        if (validator.isEmpty(servicio)) {
            dispatch(setError("Por favor elige un servicio"));
            return false;
        } else if (validator.isEmpty(empleado)) {
            dispatch(setError("Por favor elige un empleado"));
            return false;
        } else if (validator.isEmpty(fecha)) {
            dispatch(setError("Por favor elige una fecha"));
            return false;
        } else if (validator.isBefore(fecha)) {
            dispatch(setError("No puedes elegir una fecha que ya paso"));
            return false;
        } else if (inicio.isSameOrAfter(hCierre)) {
            dispatch(setError("La peluqueria esta cerrada despues de las 9:00 pm"));
            return false;
        } else if (inicio.isBefore(hApertura)) {
            dispatch(setError("La peluqueria esta abierta apartir de las 8:00 am"));
            return false;
        }

        dispatch(removeError());
        return true;
    }

    return (
        <div className="row">
            <div className="col-md-4 mx-auto">
                {
                    msgError &&
                    (
                        <div className="mt-4 alert alert-danger" role="alert">
                            {msgError}
                        </div>
                    )
                }
                <div className="card mt-4">
                    <div className="card-header textcenter">
                        <h4>Agendar Cita</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleAgendar}>
                            <div className="form-group">
                                <label htmlFor="nombre-servicio">Nombre del servicio</label>
                                <select className="form-control" value={servicio} onChange={handleInputChange} name="servicio">
                                    <option value="">Seleccione</option>
                                    {servicios.map(servicio => (
                                        <option value={servicio.nombre} key={servicio.id}>{servicio.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="nombre-empleado">Nombre del empleado</label>
                                <select className="form-control" value={empleado} onChange={handleInputChange} name="empleado">
                                    <option value="">Seleccione</option>
                                    {empleados.map(empleado => (
                                        <option value={empleado.nombre} key={empleado.id}>{empleado.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="fecha">Fecha y Hora</label>
                                <input className="form-control" value={fecha} onChange={handleInputChange} type="datetime-local" name="fecha"/>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">
                                Agendar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
