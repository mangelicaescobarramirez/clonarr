import mongoose from "mongoose";
const Schema = mongoose.Schema;
const productoSchema = new Schema({
    Id_producto: { type: String, required: true, unique: true },  // Llave primaria
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    cantidad: {type: Number, required: true },
});
const Producto = mongoose.model("Producto", productoSchema);
export default Producto;