import mongoose from "mongoose";
const Schema = mongoose.Schema;
const boletaSchema = new Schema({
    Id_boleta: { type: String, required: true, unique: true },  // Llave primaria
    Id_venta: { type: String, required: true, ref: 'Venta' },  // Llave foránea referenciando el Id_venta de la entidad Venta
    Id_producto: { type: String, required: true, ref: 'Producto' },  // Llave foránea referenciando el Id_producto de la entidad Producto
    Id_usuario: { type: String, required: true, ref: 'Usuario' },  // Llave foránea referenciando el Id_cliente de la entidad Cliente
    total : { type: Number, required: true },
    Fecha_salida: { type: Date, required: true },
});
const Boleta = mongoose.model("Boleta", boletaSchema);
export default Boleta;
