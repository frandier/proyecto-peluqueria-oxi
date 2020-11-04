import { db } from "../firebase/firebase-config"

export const consultarFecha = async (fecha) => {

    const citasRef = await db.collection('citas').where("fecha", "==", fecha).get();

    const cita = [];

    citasRef.forEach(snapHijo => {
        cita.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });

    if (cita.length) {
        return true;
    }

    return false;
}

export const consultarEmpleado = async (empleado) => {
    const citasRef = await db.collection('citas').where("empleado", "==", empleado).get();

    const cita = [];

    citasRef.forEach(snapHijo => {
        cita.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });

    if (cita.length) {
        return true;
    }

    return false;
}