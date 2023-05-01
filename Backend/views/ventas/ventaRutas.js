import Express from 'express'
import {
    queryDeleteVentas,
    queryGetVentas,
    queryPatchVentas,
    queryPostVentas
} from '../../controlllers/ventas/ventaControllers.js';

const rutasVenta = Express.Router();

const genericCallback = (res) => (err, result) => {
    if (err) {
        console.error(err);
        res.status(400).send('Error consultando los vehiculos');
    } else {
        console.log(result);
        res.json(result);
    }
};

rutasVenta.route('/ventas').get((req, res) => {
    queryGetVentas(genericCallback(res));
});

rutasVenta.route('/ventas').post((req, res) => {
    queryPostVentas(req.body, genericCallback(res));
});

rutasVenta.route('/ventas/:id').patch((req, res) => {
    queryPatchVentas(req.params.id, req.body, genericCallback(res));
});

rutasVenta.route('/ventas/:id').delete((req, res) => {
    queryDeleteVentas(req.params.id, genericCallback(res));
});

export default rutasVenta