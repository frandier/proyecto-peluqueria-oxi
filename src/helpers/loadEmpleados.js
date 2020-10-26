import { db } from "../firebase/firebase-config";

export const loadEmpleados = async () => {
    const empleadosSnap = await db.collection('empleados').get();
    const empleados = [];

    empleadosSnap.forEach(snapHijo => {
        empleados.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });

    return empleados;
}