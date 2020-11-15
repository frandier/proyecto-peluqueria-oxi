import { db } from "../firebase/firebase-config"

export const validarDocumento = async (documento) => {

    const empleadosRef = await db.collection('empleados').where("documento", "==", documento).get();
    const empleado = [];

    empleadosRef.forEach(doc => {
        empleado.push({
            id: doc.id,
            ...doc.data()
        })
    });

    if (empleado.length) {
        return true;
    }

    return false;
}