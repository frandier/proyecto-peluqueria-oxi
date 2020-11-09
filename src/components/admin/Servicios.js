import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { createNewServicio } from '../../actions/servicios';
import { removeError, setError } from '../../actions/ui';
import { uploadImage } from '../../helpers/uploadImage';
import { useForm } from '../../hooks/useForm'
import NavbarAdmin from './NavbarAdmin'

export default function Servicios() {

    const dispatch = useDispatch();

    const { msgError } = useSelector(state => state.ui);

    const [url, setUrl] = useState();

    const [formValues, handleInputChange, reset] = useForm({
        name: "",
        area: "",
        precio: ""
    });

    const { name, area, precio } = formValues;

    useEffect(() => {
        dispatch(removeError());
    }, [dispatch])

    // Al dar click activa el input file
    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }

    // Se encarga de almacenar la imagen
    const types = ['image/png', 'image/jpeg', 'image/jpg'];

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if ( file && types.includes(file.type)) {
            const result  = await uploadImage(file);
            setUrl(result);
            dispatch(removeError());
        } else {
            dispatch(setError("Por favor seleccione una imagen con formato (png, jpeg o jpg)"));
            setUrl('');
        }
    }

    // Eviar el formulario y guardar el servicio
    const handleServicio = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(createNewServicio(name, area, precio, url));
            setUrl('');
            reset();
        }
    }

    // Valida los campos del formulario
    const isFormValid = () => {
        if (validator.isEmpty(name)) {
            dispatch(setError("Por favor ingrese un nombre"));
            return false;
        } else if (validator.isEmpty(area)) {
            dispatch(setError("Por favor ingrese un area"));
            return false;
        } else if (validator.isEmpty(precio)) {
            dispatch(setError("Por favor ingrese un precio"));
            return false;
        }
        dispatch(removeError());
        return true;
    }

    return (
        <>
            <NavbarAdmin />
            <div className="row">
                <div className="col-md-4 col-sm-12 mx-auto">
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
                                <h4>Agregar Servicio</h4>
                                <button className="btn btn-info"  onClick={handlePictureClick}>Subir Imagen</button>
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleServicio}>
                                <div className="form-group">
                                    <label htmlFor="name-servicio">Nombre del Servicio</label>
                                    <input type="text" name="name" value={name} onChange={handleInputChange} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="area-servicio">Area del Servicio</label>
                                    <select className="form-control" value={area} onChange={handleInputChange} name="area">
                                        <option value="">Seleccione</option>
                                        <option value="manicure y pedicure">Manicure y Pedicure</option>
                                        <option value="cortes de cabello">Cortes de cabello</option>
                                        <option value="mechas y tintes">Mechas y Tintes</option>
                                        <option value="tratamientos">Tratamientos</option>
                                        <option value="alizado">Alisado</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="precio-servicio">Precio del Servicio</label>
                                    <input type="number" name="precio" value={precio} onChange={handleInputChange} className="form-control" />
                                </div>
                                <input
                                    id="fileSelector"
                                    type="file"
                                    name="file"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
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
