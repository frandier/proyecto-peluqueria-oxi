import React from 'react';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import { Link } from 'react-router-dom';

export default function SignUp() {

    const dispatch = useDispatch();
    const {msgError} = useSelector(state => state.ui);

    const [formValues, handleInputSubmit] = useForm({
        name: 'Spike',
        email: 'spaike@gmail.com',
        password: '123456',
        password2: '123456'
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }
    }

    const isFormValid = () => {
        if (name.trim().length === 0) {
            dispatch(setError("El nombre es requerido"));
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setError("Correo electronico no valido"));
            return false;
        } else if (password !== password2 || password.length < 5) {
            dispatch(setError("Las contraseñas deben tener almenos 6 caracteres y deben coincidir"));
            return false;
        }
        dispatch(removeError());
        return true;
    }

    return (
        <div className="row">
            <div className="col-md-4 mx-auto">
                <div className="card mt-4">
                    <div className="card-header text-center">
                        <h4>Registro</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleRegister}>
                            {
                                msgError && 
                                (
                                    <div className="alert alert-danger" role="alert">
                                        {msgError}
                                    </div>
                                )
                            }
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="nombre"
                                    autoComplete="off"
                                    value={name}
                                    onChange={handleInputSubmit}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="correo">Correo</label>
                                <input
                                    type="text"
                                    name="email"
                                    className="form-control"
                                    placeholder="correo"
                                    autoComplete="off"
                                    value={email}
                                    onChange={handleInputSubmit}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contraseña">Contraseña</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="contraseña"
                                    value={password}
                                    onChange={handleInputSubmit}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmar-contraseña">Confirmar contraseña</label>
                                <input
                                    type="password"
                                    name="password2"
                                    className="form-control"
                                    placeholder="confirmar contraseña"
                                    value={password2}
                                    onChange={handleInputSubmit}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">
                                Registrarme
                            </button>
                            <Link to="/auth/login">Ya tienes una cuenta</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
