const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Base de datos online');
    } catch (error) {
        throw new Error('Error al iniciar la DB, ver logs');
    }
};

module.exports = {
    dbConnection
}