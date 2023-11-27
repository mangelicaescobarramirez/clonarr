import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ventaSchema = new Schema({
    Id_venta: { type: String, required: true, unique: true },  // Llave primaria
    Modo_pago: { type: Number, required: true },
    Total: { type: Number, required: true },
});
const Venta = mongoose.model("Venta", ventaSchema);
export default Venta;
