import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startDeleting, startLoadingCitas } from '../../actions/citas';
import NavbarAdmin from './NavbarAdmin'

import ExportExcel from 'react-export-excel';
import moment from 'moment';
import 'moment/locale/es-mx';

const ExcelFile = ExportExcel.ExcelFile;
const ExcelSheet = ExportExcel.ExcelSheet;
const ExcelColumn = ExportExcel.ExcelColumn;

export default function Citas() {

    const dispatch = useDispatch();

    const {citas} = useSelector(state => state.citas);

    useEffect(() => {
        dispatch(startLoadingCitas());
    }, [dispatch])

    const completarCita = id => {
        dispatch(startDeleting(id));
    }

    const citasList =  citas.length ? (
        citas.map(cita => {
            moment.locale('es');
            const fecha = moment(cita.fecha);
            return (
                <tr key={cita.id}>
                    <td>{cita.servicio}</td>
                    <td>{fecha.format('MMMM Do YYYY, h:mm:ss a')}</td>
                    <td>{cita.empleado}</td>
                    <td>{cita.cliente}</td>
                    <td><button className="btn btn-primary btn-sm" onClick={() => {completarCita(cita.id)}}>Completar</button></td>
                </tr>
            )
        })
    ) : (
        console.log("No hay citas para antender")
    )

    return (
        <>
            <NavbarAdmin/>
            <div className="row">
                <div className="col-md-7 mx-auto">
                    <div className="mt-2">
                        <ExcelFile element={<button className="btn btn-primary">Exportar a Excel</button>} filename="Citas a atender">
                            <ExcelSheet data={citas} name="Citas">
                                <ExcelColumn label="Id" value="id"/>
                                <ExcelColumn label="Servicio" value="servicio"/>
                                <ExcelColumn label="Fecha" value="fecha"/>
                                <ExcelColumn label="Empleado" value="empleado"/>
                                <ExcelColumn label="Cliente" value="cliente"/>
                            </ExcelSheet>
                        </ExcelFile>
                    </div>
                    <table className="table table-striped mt-3">
                        <thead className="thead-dark">
                            <tr>
                                <th>Servicio</th>
                                <th>Fecha</th>
                                <th>Empleado</th>
                                <th>Cliente</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {citasList}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
