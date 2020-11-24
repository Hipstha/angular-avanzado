/*
    Ruta: '/api/doctores'
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const {
  getDoctores,
  crearDoctor,
  actualizarDoctor,
  borrarDoctor,
  getDoctorById,
} = require("../controllers/doctores");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWT, getDoctores);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del doctor es necesario").not().isEmpty(),
    check("hospital", "El id del hospital debe ser válido").isMongoId(),
    validarCampos,
  ],
  crearDoctor
);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre de doctor es necesario").not().isEmpty(),
    check("hospital", "El id del hospital debe ser válido").isMongoId(),
    validarCampos,
  ],
  actualizarDoctor
);

router.delete("/:id", validarJWT, borrarDoctor);

router.get("/:id", validarJWT, getDoctorById);

module.exports = router;
