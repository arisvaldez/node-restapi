import { connect } from "mongoose";

const dbConnection = async () => {
  try {
    await connect(process.env.MONGODB_CNN);
    console.log("Conexion exitosa");
  } catch (error) {
    console.error(error);
    throw new Error("Error al intentar con la DB");
  }
};

export default {
  dbConnection,
};
