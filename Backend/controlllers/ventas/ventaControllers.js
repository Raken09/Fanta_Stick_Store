import {
    getDB
} from '../../db/db.js'
import { ObjectId } from 'mongodb'; //para obtener el id defecto de mongo

const queryGetVentas = async (callback) => {
    const conexion = getDB();
    await conexion.collection('ventas').find({}) /* .limit(50) */ .toArray(callback); //limit para tener solo 50 registros. find es la operacion                       
}

const queryPostVentas = async (datosVenta, callback) => {
    //console.log('venta a crear: ', req.body) //me muestra la info del venta a crear
    //console.log("llaves: ", Object.keys(datosVenta)); //me muestra las llaves del venta a crear
        const conexion = getDB();
        await conexion.collection('ventas').insertOne(datosVenta, callback);
};

const queryPatchVentas = async (id, edicion, callback) => {
    const filtroVenta = {
        _id: new ObjectId(id) //cuando es el id por defecto
    };
    delete edicion._id; //se usa cuando enviamos el id por el body o usamos el id por defecto de mongo
    const operacion = {
        $set: edicion
    };
    const conexion = getDB();
    await conexion
        .collection('ventas')
        .findOneAndUpdate(filtroVenta, operacion, {
            upsert: true,
            returnOriginal: true
        }, callback);
}

const queryDeleteVentas = async (id, callback) => {
    const filtroVenta = {
        _id: new ObjectId(id) //cuando es el id por defecto
    };
    //delete edicion._id;   //se usa cuando enviamos el id por el body o usamos el id por defecto de mongo
                            //esto no se hace si usamos rutas dinamicas con id en la url

    const conexion = getDB();
    await conexion.collection('ventas').deleteOne(filtroVenta, callback);
}

export {
    queryGetVentas,
    queryPostVentas,
    queryPatchVentas,
    queryDeleteVentas
};