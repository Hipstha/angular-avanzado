const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res) => {

    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ email });

        // verifica email
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Contraseña o email no válido'
            });
        }

        // Verificar pass
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña o email no válido'
            });
        }

        // Generar el token
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
};

const googleSingIn = async(req, res = response) => {
    const googleToken = req.body.token;
    try {
        const { name, email, picture } = await googleVerify(googleToken);

        // verificar si ya existe 
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            // si no existe
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            // existe usuario
            usuario = usuarioDB;
            usuario.google = true;

        }

        // guardar en DB
        await usuario.save();

        // generar JWT
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            ok: true,
            token
        });
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto'
        });
    }
};

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    // generar el TOKEN
    const token = await generarJWT(uid);

    res.json({
        ok: true,
        token
    });
};

module.exports = {
    login,
    googleSingIn,
    renewToken
};