import {db} from "../firebase/firebase-config";

export const validarServicio = async (nombre) => {
    
    const serviciosRef = await db.collection('servicios').where("nombre", "==", nombre).get();
    const servicio = [];

    serviciosRef.forEach(doc => {
        servicio.push({
            id: doc.id,
            ...doc.data()
        })
    });

    if (servicio.length) {
        return true;
    }

    return false;
}