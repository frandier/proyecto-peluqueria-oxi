import React from 'react'
import { useSelector } from 'react-redux'
import NavbarAdmin from './NavbarAdmin'

export default function Citas() {

    const {citas} = useSelector(state => state.citas);

    return (
        <>
            <NavbarAdmin/>
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <table className="table table-striped mt-5">
                        <thead className="thead-dark">
                            <tr>
                                <th>Servicio</th>
                                <th>Dia</th>
                                <th>Hora</th>
                                <th>Empleado</th>
                                <th>Cliente</th>
                                <th>Completado</th>
                            </tr>
                        </thead>
                        <tbody>
                            { citas.map(cita => (
                                <tr key={cita.id}>
                                    <td>{cita.servicio}</td>
                                    <td>{cita.dia}</td>
                                    <td>{cita.hora}</td>
                                    <td>{cita.empleado}</td>
                                    <td>{cita.cliente}</td>
                                    <td>No</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
