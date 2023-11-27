import mongoose from "mongoose";
const Schema = mongoose.Schema;
const administradorSchema = new Schema({
    Id_admin: { type: String, required: true, unique: true },  // Primary key
    nombre: { type: String, required: true },
    correo: { type: String, required: true },
    contraseña: { type: String, required: true },
    rol: { type: String, enum: ['administrador', 'vendedor'], default: 'administrador' },  // 'administrador' by default
});
const Administrador = mongoose.model("Administrador", administradorSchema);
export default Administrador;