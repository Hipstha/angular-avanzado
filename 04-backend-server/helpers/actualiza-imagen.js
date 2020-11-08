const fs = require('fs');

const Usuario = require('../models/usuario');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        // borrar la imagen anterior
        fs.unlinkSync(path);
    }
};

const actualizarImagen = async(tipo, id, nombreArchivo) => {
    let pathViejo = '';
    switch (tipo) {
        case 'doctores':
            const doctor = await Doctor.findById(id);
            if (!doctor) {
                return false;
            }

            pathViejo = `./uploads/doctores/${ doctor.img }`;
            borrarImagen(pathViejo);

            doctor.img = nombreArchivo;
            await doctor.save();
            return true;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                return false;
            }

            pathViejo = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
    }
};

module.exports = {
    actualizarImagen
}