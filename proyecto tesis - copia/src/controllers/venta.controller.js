import Venta from "../models/venta.model.js";
export const listarVentas = async (req, res) => {
    try {
        const ventas = await Venta.find();
        return res.json(ventas);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
export const obtenerVentaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const venta = await Venta.findById(id);
        if (!venta) {
            return res.status(404).json({ error: "Venta no encontrada" });
        }
        return res.json(venta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
export const crearVenta = async (req, res) => {
    try {
        // Ensure that the request body contains the required parameters
        const { Id_venta, Modo_pago, Total } = req.body;
        // Validate that the required parameters are present
        if (!Id_venta || !Modo_pago || !Total) {
            return res.status(400).json({ error: "Todos los campos son requeridos" });
        }
        const nuevaVenta = new Venta({
            Id_venta,
            Modo_pago,
            Total,
        });
        const ventaGuardada = await nuevaVenta.save();
        return res.status(201).json(ventaGuardada);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
export const modificarVenta = async (req, res) => {
    const { id } = req.params;
    try {
        const ventaModificada = await Venta.findByIdAndUpdate(id, req.body, { new: true });
        if (!ventaModificada) {
            return res.status(404).json({ error: "Venta no encontrada" });
        }
        return res.json(ventaModificada);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
export const eliminarVenta = async (req, res) => {
    const { id } = req.params;
    try {
        const ventaEliminada = await Venta.findByIdAndRemove(id);
        if (!ventaEliminada) {
            return res.status(404).json({ error: "Venta no encontrada" });
        }
        return res.json({ mensaje: "Venta eliminada exitosamente", ventaEliminada });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};