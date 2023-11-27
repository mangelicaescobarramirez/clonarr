import mongoose from "mongoose";
const Schema = mongoose.Schema;
const usuarioSchema = new Schema({
    Id_usuario: { type: String, required: true, unique: true },  // Llave primaria
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    correo: { type: String, required: true, unique: true },  // Asegura que el correo sea único
    contraseña: { type: String, required: true },
});
const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;