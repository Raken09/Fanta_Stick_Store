import Express, { response } from 'express'
import {
    queryDeleteUsuarios,
    queryGetOPostUsurio,
    queryGetUsuarios,
    queryPatchUsuarios,
    queryPostUsuarios
} from '../../controlllers/usuarios/usuarioControllers.js';

const rutasUsuario = Express.Router();

const genericCallback = (res) => (err, result) => {
    if (err) {
        console.error(err);
        res.status(400).send('Error consultando los vehiculos');
    } else {
        console.log(result);
        res.json(result);
    }
};

rutasUsuario.route('/usuarios').get((req, res) => {
    queryGetUsuarios(genericCallback(res));
});

rutasUsuario.route('/usuarios').post((req, res) => {
    queryPostUsuarios(req.body, genericCallback(res));
});

rutasUsuario.route('/usuarios/self').get((req, res) => {
    queryGetOPostUsurio(req, genericCallback(res));
});

rutasUsuario.route('/usuarios/:id').patch((req, res) => {
    queryPatchUsuarios(req.params.id, req.body, genericCallback(res));
});

rutasUsuario.route('/usuarios/:id').delete((req, res) => {
    queryDeleteUsuarios(req.params.id, genericCallback(res));
});

export default rutasUsuario