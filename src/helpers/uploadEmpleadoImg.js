import Swal from "sweetalert2";
import { storage } from "../firebase/firebase-config"

export const uploadEmpleadoImg = (image) => {

    const urls = [];

    const uploadTask = storage.ref('empleados/' + image.name).put(image);

    uploadTask.on('state_changed', (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        Swal.fire({
            title: "Subiendo...",
            text: "Espere por favor...",
            allowOutsideClick: false,
            willClose: () => {
                Swal.showLoading();
                Swal.fire({
                    icon: 'success',
                    title: 'Completado',
                    text: 'Se ha subido la imagen correctamente!'
                })
            }
        });
    }, (error) => {
        console.log(error);
    }, async () => {
        const url = await uploadTask.snapshot.ref.getDownloadURL();
        urls.push(url);
        Swal.close();
    });

    return urls;
}