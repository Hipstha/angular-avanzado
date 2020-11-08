/*
    Ruta: '/api/doctores'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getDoctores, crearDoctor, actualizarDoctor, borrarDoctor } = require('../controllers/doctores');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getDoctores);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del doctor es necesario').not().isEmpty(),
        check('hospital', 'El id del hospital debe ser válido').isMongoId(),
        validarCampos
    ],
    crearDoctor
);

router.put('/:id', [

    ],
    actualizarDoctor
);

router.delete('/:id', borrarDoctor);

module.exports = router;