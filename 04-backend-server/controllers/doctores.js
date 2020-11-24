const { response } = require("express");
const Doctor = require("../models/doctor");

const getDoctores = async (req, res = response) => {
  const doctores = await Doctor.find()
    .populate("usuario", "nombre email img")
    .populate("hospital", "nombre");
  res.status(200).json({
    ok: true,
    doctores,
  });
};

const crearDoctor = async (req, res = response) => {
  const uid = req.uid;
  const doctor = new Doctor({ usuario: uid, ...req.body });
  try {
    const doctorDB = await doctor.save();
    res.status(200).json({
      ok: true,
      doctor: doctorDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarDoctor = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;
  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({
        ok: true,
        msg: "Doctor no encontrado por id",
      });
    }

    const cambiosDoctor = {
      ...req.body,
      usuario: uid,
    };

    const doctorActualizado = await Doctor.findByIdAndUpdate(
      id,
      cambiosDoctor,
      { new: true }
    );

    res.status(200).json({
      ok: true,
      doctor: doctorActualizado,
    });
  } catch (error) {
    return res.status(500).json({
      ok: true,
      msg: "Comuniquese con el administrador",
    });
  }
};

const borrarDoctor = async (req, res = response) => {
  const id = req.params.id;

  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({
        ok: true,
        msg: "Doctor no encontrado por id",
      });
    }
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      msg: "Comuniquese con el administrador",
    });
  }
};

const getDoctorById = async (req, res = response) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id)
      .populate("usuario", "nombre email img")
      .populate("hospital", "nombre");
    res.status(200).json({
      ok: true,
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      msg: "Comuniquese con el administrador",
    });
  }
};

module.exports = {
  getDoctores,
  crearDoctor,
  actualizarDoctor,
  borrarDoctor,
  getDoctorById,
};
