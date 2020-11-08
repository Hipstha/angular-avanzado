// obtener todo
const { response } = require('express');

const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');

const getTodo = async(req, res = response) => {
    try {
        const busqueda = req.params.busqueda || '';
        const regex = new RegExp(busqueda, 'i');


        const [usuarios, hospitales, doctores] = await Promise.all([
            Usuario.find({ nombre: regex }),
            Hospital.find({ nombre: regex }),
            Doctor.find({ nombre: regex })
        ]);

        res.status(200).json({
            ok: true,
            busqueda,
            usuarios,
            hospitales,
            doctores
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const getDocumentosColeccion = async(req, res = response) => {
    try {
        const tabla = req.params.tabla;
        const busqueda = req.params.busqueda || '';
        const regex = new RegExp(busqueda, 'i');

        let data = [];

        switch (tabla) {
            case 'doctores':
                data = await Doctor.find({ nombre: regex })
                    .populate('usuario', 'nombre img')
                    .populate('hospital', 'nombre img');
                break;

            case 'hospitales':
                data = await Hospital.find({ nombre: regex })
                    .populate('usuario', 'nombre img');
                break;

            case 'usuarios':
                data = await Usuario.find({ nombre: regex });
                break;

            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'La tabla tiene que ser usuarios/doctores/hospitales'
                });

        }
        res.status(200).json({
            ok: true,
            resultados: data
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

module.exports = {
    getTodo,
    getDocumentosColeccion
};