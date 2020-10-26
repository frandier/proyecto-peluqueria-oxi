import { db } from "../firebase/firebase-config"


export const loadCitas = async () => {
    const citasSnap = await db.collection('citas').get();
    const citas = [];
    
    citasSnap.forEach(snapHijo => {
        citas.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });

    return citas;
}