import Producto from "../models/producto.model.js";
export const listarProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        return res.json(productos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
export const obtenerProductoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        return res.json(producto);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
export const crearProducto = async (req, res) => {
    try {
        // Ensure that the request body contains the required parameters
        const { Id_producto, nombre, precio, cantidad } = req.body;
        // Validate that the required parameters are present
        if (!Id_producto || !nombre || !precio || !cantidad) {
            return res.status(400).json({ error: "Todos los campos son requeridos" });
        }
        const nuevoProducto = new Producto({
            Id_producto,
            nombre,
            precio,
            cantidad,
        });
        const productoGuardado = await nuevoProducto.save();
        return res.status(201).json(productoGuardado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
export const modificarProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const productoModificado = await Producto.findByIdAndUpdate(id, req.body, { new: true });
        if (!productoModificado) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        return res.json(productoModificado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
export const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const productoEliminado = await Producto.findByIdAndRemove(id);
        if (!productoEliminado) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        return res.json({ mensaje: "Producto eliminado exitosamente", productoEliminado });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
export const buscarProductoPorNombre = async (req, res) => {
    const { nombre } = req.params;
    try {
        const productos = await Producto.find({ nombre: { $regex: new RegExp(nombre, "i") } });
        return res.json(productos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};