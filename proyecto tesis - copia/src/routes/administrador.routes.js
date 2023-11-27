import express from "express";
import { login, register, listar, modificar, eliminar, logout, verifyToken } from "../controllers/administrador.controlles.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/administrador.schema.js";
import {
    listarBoletas,
    obtenerBoletaPorId,
    crearBoleta,
    modificarBoleta,
    eliminarBoleta
  } from "../controllers/boleta.controller.js";
  import {
    listarProductos,
    obtenerProductoPorId,
    crearProducto,
    modificarProducto,
    eliminarProducto,
    buscarProductoPorNombre
  } from "../controllers/producto.controller.js";
  
import {
  listarVentas,
  obtenerVentaPorId,
  crearVenta,
  modificarVenta,
  eliminarVenta
} from "../controllers/venta.controller.js";
import {listarUsuarios ,  modificarUsuarioPorCorreo , eliminarUsuarioPorCorreo} from "../controllers/usuario.controller.js"
const router = express.Router();
// Rutas para administradores
router.post("/login", validateSchema(loginSchema), login);
router.post("/register", validateSchema(registerSchema), register);
router.get("/listar", verifyToken, listar); // Aplicar verifyToken aquí
router.put("/modificar/:id", verifyToken, modificar); // Aplicar verifyToken aquí
router.delete("/eliminar/:id", verifyToken, eliminar); // Aplicar verifyToken aquí
router.get("/verify", verifyToken);
router.post("/logout", verifyToken, logout);
// Rutas para usuarios
router.get("/listarUsuarios", verifyToken, listarUsuarios); // Listar todos los usuarios
router.put("/modificarUsuario/:id", verifyToken, modificarUsuarioPorCorreo); // Modificar usuario por ID
router.delete("/eliminarUsuario/:id", verifyToken, eliminarUsuarioPorCorreo); // Eliminar usuario por ID
// Rutas para boletas
router.get("/boletas", listarBoletas); // Listar todas las boletas
router.get("/boletas/:id", obtenerBoletaPorId); // Obtener boleta por ID
router.post("/boletas", crearBoleta); // Crear nueva boleta
router.put("/boletas/:id", modificarBoleta); // Modificar boleta por ID
router.delete("/boletas/:id", eliminarBoleta); // Eliminar boleta por ID
// Rutas para productos
router.get("/productos", listarProductos); // Listar todos los productos
router.get("/productos/:id", obtenerProductoPorId); // Obtener producto por ID
router.post("/productos", crearProducto); // Crear nuevo producto
router.put("/productos/:id", modificarProducto); // Modificar producto por ID
router.delete("/productos/:id", eliminarProducto); // Eliminar producto por ID
router.get("/productos/buscar/:nombre", buscarProductoPorNombre); // Buscar producto por nombre
// Rutas para ventas
router.get("/ventas", listarVentas); // Listar todas las ventas
router.get("/ventas/:id", obtenerVentaPorId); // Obtener venta por ID
router.post("/ventas", crearVenta); // Crear nueva venta
router.put("/ventas/:id", modificarVenta); // Modificar venta por ID
router.delete("/ventas/:id", eliminarVenta); // Eliminar venta por ID
export default router;