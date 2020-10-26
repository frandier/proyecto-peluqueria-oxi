import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { Link } from 'react-router-dom';

export default function SignIn() {

    const dispatch = useDispatch();
    const { loading } = useSelector( state => state.ui );
    const {msgError} = useSelector(state => state.ui);

    const [ formValues, handleInputChange ] = useForm({
        email: 'spaike@gmail.com',
        password: '123456'
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch( startLoginEmailPassword( email, password ) );
        }
    }

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    }

    const isFormValid = () => {
        if (!validator.isEmail(email)) {
            dispatch(setError("Correo electronico no valido"));
            return false;
        } else if (validator.isEmpty(password)) {
            dispatch(setError("Por favor ingrese una contraseña"));
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
                        <h4>Iniciar</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            {
                                msgError && 
                                (
                                    <div className="alert alert-danger" role="alert">
                                        {msgError}
                                    </div>
                                )
                            }
                            <div className="form-group">
                                <label htmlFor="correo">Correo</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="correo" 
                                    name="email" 
                                    autoComplete="off"
                                    value={email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contraseña">Contraseña</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="contraseña" 
                                    name="password"
                                    value={password}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="btn btn-primary btn-block"
                                disabled={loading}
                            >
                                Iniciar Sesión 
                            </button>
                            <span
                                className="btn btn-secondary btn-block"
                                onClick={handleGoogleLogin}
                            >
                                <i className="fab fa-google"></i> Iniciar con Google
                            </span>
                            <Link to="/auth/register">Crear una cuenta nueva</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
