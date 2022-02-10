const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log('Conexion exitosa');
  } catch (error) {
    console.error(error);
    throw new Error('Error al intentar con la DB');
  }
};

module.exports = {
  dbConnection,
};
