import {
    getDB
} from '../db/db.js'
import jwt_decode from 'jwt-decode';

const authEstadoUsuario = async (req, res, next) => {
    //Paso 1 > obtener el usuario desde el token
    const token = req.headers.authorization.split('Bearer ')[1];
    const user = jwt_decode(token)['http://localhost/userData'];

    //Paso 2 > consultar el usuario en db
    const conexion = getDB();
    await conexion.collection('usuarios').findOne({
        email: user.email
    }, async (err, response) => {

        if (response) {
            //Paso 3 > verificar el estado del usuario
            if (response.estadoUsuario === 'No autorizado' || response.estadoUsuario === 'Pendiente') {
                //Paso 4 > si el usuario es No autorizado devuelve un error de autenticacion
                console.log('no habilitado')
                res.sendStatus(401)
                res.end();
            }
        }
        next();
    });
}

export default authEstadoUsuario