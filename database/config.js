const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    console.log(process.env.MONGODB_CNN);
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
