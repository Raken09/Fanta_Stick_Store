import {
    MongoClient,
    ObjectId
} from "mongodb";
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
});

const stringConexion = process.env.DATABASE_URL;

const client = new MongoClient(stringConexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dataBase;

const conectarDB = (callback) => {
    client.connect((err, db) => {
        if (err) {
            console.error('Error conectando a la base de datos');
        }
        dataBase = db.db('productos');
        console.log('conexión éxitosa')
        return callback();
    });
}

const getDB = () => {
    return dataBase;
}

export {
    conectarDB,
    getDB
}