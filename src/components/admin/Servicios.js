import React from 'react'
import { useDispatch } from 'react-redux';
import { createNewServicio } from '../../actions/servicios';
import { useForm } from '../../hooks/useForm'
import NavbarAdmin from './NavbarAdmin'

export default function Servicios() {

    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
        name: "",
        area: "",
        precio: ""
    });

    const {name, area, precio} = formValues;

    const handleServicio = (e) => {
        e.preventDefault();
        dispatch(createNewServicio(name, area, precio));
    }

    return (
        <>
            <NavbarAdmin/>
            <div className="row">
                <div className="col-md-4 mx-auto">
                    <div className="card mt-4">
                        <div className="card-header text-center">
                            <h4>Agregar Servicio</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleServicio}>
                                <div className="form-group">
                                    <label htmlFor="name-servicio">Nombre del Servicio</label>
                                    <input type="text" name="name" value={name} onChange={handleInputChange} className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="area-servicio">Area del Servicio</label>
                                    <input type="text" name="area" value={area} onChange={handleInputChange} className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="precio-servicio">Precio del Servicio</label>
                                    <input type="number" name="precio" value={precio} onChange={handleInputChange} className="form-control"/>
                                </div>
                                <button className="btn btn-primary btn-block">
                                    Agregar Servicio
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
