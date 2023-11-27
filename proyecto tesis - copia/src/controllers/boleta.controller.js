import Boleta from "../models/boleta.model.js";
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library
export const listarBoletas = async (req, res) => {
    try {
        const boletas = await Boleta.find();
        return res.json(boletas);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
export const obtenerBoletaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const boleta = await Boleta.findById(id);
        if (!boleta) {
            return res.status(404).json({ error: "Boleta no encontrada" });
        }
        return res.json(boleta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
export const crearBoleta = async (req, res) => {
    try {
        const nuevaBoleta = new Boleta({
            Id_boleta: uuidv4(), // Use uuid to generate a unique identifier
            Id_venta: req.body.Id_venta,
            Id_producto: req.body.Id_producto,
            Id_usuario: req.body.Id_usuario,
            total: req.body.total,
            Fecha_salida: new Date(), // Automatically set the current date and time
        });
        const boletaGuardada = await nuevaBoleta.save();
        return res.status(201).json(boletaGuardada);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
export const modificarBoleta = async (req, res) => {
    const { id } = req.params;
    try {
        const boletaModificada = await Boleta.findByIdAndUpdate(id, req.body, { new: true });
        if (!boletaModificada) {
            return res.status(404).json({ error: "Boleta no encontrada" });
        }
        return res.json(boletaModificada);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
export const eliminarBoleta = async (req, res) => {
    const { id } = req.params;
    try {
        const boletaEliminada = await Boleta.findByIdAndRemove(id);
        if (!boletaEliminada) {
            return res.status(404).json({ error: "Boleta no encontrada" });
        }
        return res.json({ mensaje: "Boleta eliminada exitosamente", boletaEliminada });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};