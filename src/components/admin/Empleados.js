import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { createNewEmpleado } from '../../actions/empleados';
import { removeError, setError } from '../../actions/ui';
import { uploadEmpleadoImg } from '../../helpers/uploadEmpleadoImg';
import { useForm } from '../../hooks/useForm'
import NavbarAdmin from './NavbarAdmin'

export default function Empleados() {

    const dispatch = useDispatch();

    const {msgError} = useSelector(state => state.ui);

    const [url, setUrl] = useState();

    const [formValues, handleInputChange, reset] = useForm({
        name: "",
        lastname: "",
        especialidad: ""
    });

    const {name, lastname, especialidad} = formValues;

    useEffect(() => {
        dispatch(removeError());
    }, [dispatch])


    // Al dar click activa el input file
    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }

    // Se encarga de almacenar la imagen
    const types = ['image/png', 'image/jpeg'];

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if ( file && types.includes(file.type)) {
            const result  = await uploadEmpleadoImg(file);
            setUrl(result);
            dispatch(removeError());
        } else {
            dispatch(setError("Por favor seleccione una imagen con formato (png o jpg)"));
            setUrl('');
        }
    }

    const handleEmpleado = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(createNewEmpleado(name, lastname, especialidad, url));
            reset();
        }
    }

    const isFormValid = () => {
        if (validator.isEmpty(name)) {
            dispatch(setError("Por favor ingrese un nombre"));
            return false;
        } else if (validator.isEmpty(lastname)) {
            dispatch(setError("Por favor ingrese un apellido"));
            return false;
        } else if (validator.isEmpty(especialidad)) {
            dispatch(setError("Por favor seleccione un especialidad"));
            return false;
        }
        dispatch(removeError());
        return true;
    }

    return (
        <>
            <NavbarAdmin/>
            <div className="row">
                <div className="col-md-4 mx-auto">
                    {
                        msgError && 
                        (
                            <div className="alert alert-danger" role="alert">
                                {msgError}
                            </div>
                        )
                    }
                    <div className="card mt-4">
                        <div className="card-header text-center">
                        <div className="d-flex justify-content-around">
                                <h4>Agregar Empleado</h4>
                                <button className="btn btn-info"  onClick={handlePictureClick}>Subir Imagen</button>
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleEmpleado}>
                                
                                <div className="form-group">
                                    <label htmlFor="nombre-empleado">Nombre del Empleado</label>
                                    <input type="text" name="name" className="form-control" value={name} onChange={handleInputChange} autoComplete="off"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="apellido-empleado">Apellido del Empleado</label>
                                    <input type="text" name="lastname" className="form-control" value={lastname} onChange={handleInputChange} autoComplete="off"/> 
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
                                <input
                                    id="fileSelector"
                                    type="file"
                                    name="file"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
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
