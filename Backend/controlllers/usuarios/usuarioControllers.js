import {
    getDB
} from '../../db/db.js';
import { ObjectId } from 'mongodb'; //para obtener el id defecto de mongo
import jwt_decode from 'jwt-decode';

const queryGetUsuarios = async (callback) => {
    const conexion = getDB();
    await conexion.collection('usuarios').find({}) /* .limit(50) */ .toArray(callback); //limit para tener solo 50 registros. find es la operacion                       
}

const queryPostUsuarios = async (datosUsuario, callback) => {
    //console.log('producto a crear: ', req.body) //me muestra la info del producto a crear
    //console.log("llaves: ", Object.keys(datosUsuario)); //me muestra las llaves del producto a crear
        const conexion = getDB();
        await conexion.collection('usuarios').insertOne(datosUsuario, callback);
};

const queryGetOPostUsurio = async (req, callback) => {
    //PASO 6 > OBTENER LA INFO DEL USUARIO DESDE EL TOKEN
    const token = req.headers.authorization.split('Bearer ')[1];
    const user = jwt_decode(token)['http://localhost/userData'];

    //PASO 6.1 > CONSULTAR EN LA DB SI EL USUARIO ESTA
    const conexion = getDB();
    await conexion.collection('usuarios').findOne({
        email: user.email
    }, async (err, response) => {

        if (response) {
            //PASO 7.1 > SI EL USUARIO EXISTE EN DB, DEVULVE LA INFO    
            callback(err, response);
        } else {
            //PASO 7.2 > SI EL USUARIO NO EXISTE EN DB, LO CREA Y DEVULVE LA INFO
            user.auth0ID = user._id;    
            delete user._id;            //renombrar el id de auth0 para consistencia en db
            user.estadoUsuario = 'Pendiente';       //Asignamos el estado inicial a todos los usuarios
            user.rol = 'Sin asignar';               //Asignamos el rol inicial a todos los usuarios
            await queryPostUsuarios(user, (error, respuesta) => callback(err, user));
        }
    });
}

const queryPatchUsuarios = async (id, edicion, callback) => {
    const filtroUsuario = {
        _id: new ObjectId(id)
    };
    delete edicion._id; //se usa cuando enviamos el id por el body o usamos el id por defecto de mongo
    const operacion = {
        $set: edicion
    };
    const conexion = getDB();
    await conexion
        .collection('usuarios')
        .findOneAndUpdate(filtroUsuario, operacion, {
            upsert: true,
            returnOriginal: true
        }, callback);
}

const queryDeleteUsuarios = async (id, callback) => {
    const filtroUsuario = {
        _id: new ObjectId(id)
    };
    //delete edicion._id;   //se usa cuando enviamos el id por el body o usamos el id por defecto de mongo
    //esto no se hace si usamos rutas dinamicas con id en la url

    const conexion = getDB();
    await conexion.collection('usuarios').deleteOne(filtroUsuario, callback);
}

export {
    queryGetUsuarios,
    queryGetOPostUsurio,
    queryPostUsuarios,
    queryPatchUsuarios,
    queryDeleteUsuarios
};