# Aplicacion web para la empresa Belleza Integral OXI

Aplicación web para la gestión de citas de una peluqueria, en este caso la de la empresa Belleza integral Oxi.
en donde los clientes podran ver los servicios que se ofrecen en el lugar, asi como tambien informacion de interes,
contando la aplicacion con un sistema de autenticación y permisos de usuario, para una mejor serguridad y funcionanmiento
de la aplicación.

## Comenzando 🚀

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

Mira **Deployment** para conocer como desplegar el proyecto.


### Pre-requisitos 📋

Este proyecto esta realizado con Firebase, por lo tanto es necesario conficurar sus propias credenciales de usuario.
En el archivo firebase-config.js ubicado en la ruta src/firbase/firebase-config.js, editar lo siguiente: 

```
const firebaseConfig = {
    apiKey: "tus credenciales",
    authDomain: "tus credenciales",
    databaseURL: "tus credenciales",
    projectId: "tus credenciales",
    storageBucket: "tus credenciales",
    messagingSenderId: "tus credenciales",
    appId: "tus credenciales",
    measurementId: "tus credenciales"
};
```
Ademas de habilitar la Authentication con correo y contrseña en la consola de firebase, asi como tambien el metodo de 
Iniciar sesión con google, y muy importante habilitar Firestore.

Tambien es necesario tener una version reciente de Node.js o Yarn, para poder ejecutar este proyecto.

### Instalación 🔧

Para instalar el proyecto con Node.js solo basta ejecutar:

```
npm install
```

Esto instalara las dependencias necesarias para que nuestro proyecto funcione.

Y para ejecutar el proyecto, es necesario el comando:

```
npm start o yarn start
```

## Despliegue 📦

Para generar el build de la aplicación es necesario usar e comando:

```
npm build o yarn build
```

## Construido con 🛠️

* [React](https://es.reactjs.org/docs/getting-started.html) - El framework web usado
* [Redux](https://firebase.google.com/) - Contenedor del estado de la aplicación
* [Yarn](https://yarnpkg.com/getting-started) - Manejador de dependencias
* [Firebase](https://firebase.google.com/) - Usado como Backend de la aplicación

## Autores ✒️

* **Fabian Franco** - *Trabajo Inicial* - [Fabian Franco](https://github.com/franco762)
* **Oscar Polo** - *Documentación* - [Oscar Polo](https://github.com/oscar-polo)

## Licencia 📄

Este proyecto está bajo la Licencia (GPL) - mira la web oficial de la licancia [GPL](https://www.gnu.org/licenses/licenses.es.html) para detalles

## Expresiones de Gratitud 🎁

* Gracias a Fernando Herrera por su curso de react que me ha ayudado en el proyecto📢
* Gracias a Fazt por su tutoriales y videos que han sido de gran ayua en mi camino como desarrollador web📢
* Gracias a los demas youtubers TheNetNinja, Bluuweb, Traversy Media, FreeCodeCamp, por compartir sus conocimientos🤓
