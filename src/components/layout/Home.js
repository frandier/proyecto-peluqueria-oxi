import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Servicios from './Servicios';
import Empleados from './Empleados';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingEmpleados } from '../../actions/empleados';
import { startLoadingServicios } from '../../actions/servicios';

export default function Home() {

    const dispatch = useDispatch();

    const {admin} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startLoadingEmpleados())
        dispatch(startLoadingServicios())
    }, [dispatch])

    return (
        <>
            {/* Header */}
            <header className="bg-primary py-5 mb-5">
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-lg-12">
                            <h1 className="display-4 text-white mt-5 mb-2">La belleza marca la diferencia</h1>
                            <p className="lead mb-5 text-white-50">Somos una empresa dedicada a la belleza de forma integral, buenos precios y excelentes resultados.</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Contenido de la pagina */}
            <div className="container">
                <div className="row">
                    <div className="col-md-8 mb-5">
                        <h2>Que ofrecemos</h2>
                        <hr/>
                        <p>Ofrecemos diferentes tipos de servicios de belleza desde servicios basicos como manicure y pedicure hasta servicios mas dedicados tales como uñas en acrilicio y semipermanentes.</p>
                        <p>Ademas de cortes de cabello unisex, tientes, mechas, depilaciones, alizado de cabellos, kertina, entre muchos otros mas, ademas de contar con profesionales capacitados para tarea y contar con todas las normas de salud.</p>
                        {
                            !admin &&
                            (
                                <Link to="/user/agendar" className="btn btn-primary btn-lg">Agenda una Cita &raquo;</Link>
                            )
                        }
                    </div>
                    <div className="col-md-4 mb-5">
                        <h2>Contactanos</h2>
                        <hr/>
                        <address>
                            <strong>Belleza Integral Oxi</strong>
                            <br/>Cr. 34a # 4a -10
                            <br/>Rosa Blanca Oriental
                            <br/>
                        </address>
                        <address>
                            <abbr title="Telefono">T: </abbr>
                            3107175550
                            <br/>
                            <abbr title="Correo">C: </abbr>
                            peluqueriaoxi@oxi.com
                        </address>
                    </div>
                </div>

                <div className="mt-2 mb-3">
                    <h3><strong>Servicios</strong></h3>
                </div>

                <Servicios />

                <div className="mt-2 mb-3">
                    <h3><strong>Empleados</strong></h3>
                </div>

                <Empleados />
            </div>
            
            {/* Footer */}
            <footer className="py-5 bg-dark">
                <div className="container">
                    <p className="m-0 text-center text-white">Copyright &copy; Belleza Integral Oxi 2020</p>
                </div>
            </footer>
        </>
    )
}
