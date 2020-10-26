import { db } from "../firebase/firebase-config"

export const loadServicios = async() => {
    const serviciosSnap = await db.collection('servicios').get();
    const servicios = [];

    serviciosSnap.forEach(snapHijo => {
        servicios.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });

    return servicios;
}