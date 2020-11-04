import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { removeError, setError } from '../../actions/ui';
import { addAdmin } from '../../helpers/addAdmin';
// import { functions } from '../../firebase/firebase-config';
import { useForm } from '../../hooks/useForm'
import NavbarAdmin from './NavbarAdmin';

export default function AddAdmin() {

    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui);

    const [formValues, handleInputChange] = useForm({
        email: ""
    });

    const { email } = formValues;

    const handleAddAdmin = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            console.log("hola");
            addAdmin(email);
        }
    }

    const isFormValid = () => {
        if (!validator.isEmail(email)) {
            dispatch(setError("Correo electronico no valido"));
            return false;
        }
        dispatch(removeError());
        return true;
    }

    return (
        <>
            <NavbarAdmin />
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
                            <h4>Añadir Admin</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleAddAdmin}>
                                <div className="form-group">
                                    <label htmlFor="email">Correo Electronico</label>
                                    <input type="text" className="form-control" name="email" value={email} onChange={handleInputChange} placeholder="correo electronico" autoComplete="off" />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">
                                    Hacer Admin
                            </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
