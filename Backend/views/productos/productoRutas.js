import Express from 'express'
import {
    queryDeleteProductos,
    queryGetProductos,
    queryPatchProductos,
    queryPostProductos
} from '../../controlllers/productos/productoControllers.js';

const rutasProducto = Express.Router();

const genericCallback = (res) => (err, result) => {
    if (err) {
        console.error(err);
        res.status(400).send('Error consultando los vehiculos');
    } else {
        console.log(result);
        res.json(result);
    }
};

rutasProducto.route('/productos').get((req, res) => {
    queryGetProductos(genericCallback(res));
});

rutasProducto.route('/productos').post((req, res) => {
    queryPostProductos(req.body, genericCallback(res));
});

rutasProducto.route('/productos/:id').patch((req, res) => {
    queryPatchProductos(req.params.id, req.body, genericCallback(res));
});

rutasProducto.route('/productos/:id').delete((req, res) => {
    queryDeleteProductos(req.params.id, genericCallback(res));
});

export default rutasProducto