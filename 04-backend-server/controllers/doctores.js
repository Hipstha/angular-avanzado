const { response } = require('express');
const Doctor = require('../models/doctor');

const getDoctores = async(req, res = response) => {
    const doctores = await Doctor.find()
        .populate('usuario', 'nombre email img')
        .populate('hospital', 'nombre');
    res.status(200).json({
        ok: true,
        doctores
    });
};

const crearDoctor = async(req, res = response) => {
    const uid = req.uid;
    const doctor = new Doctor({ usuario: uid, ...req.body });
    try {
        const doctorDB = await doctor.save();
        res.status(200).json({
            ok: true,
            doctor: doctorDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const actualizarDoctor = (req, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'actualizarDoctor'
    });
};

const borrarDoctor = (req, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'borrarDoctor'
    });
};

module.exports = {
    getDoctores,
    crearDoctor,
    actualizarDoctor,
    borrarDoctor
}