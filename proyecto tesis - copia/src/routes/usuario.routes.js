import express from "express";
import { registrarUsuario, loginUsuario, logoutUsuario, verifyTokenUsuario } from "../controllers/usuario.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema,  } from "../schemas/administrador.schema.js";
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
    buscarProductoPorNombre
  } from "../controllers/producto.controller.js";
  import {
    listarVentas,
    obtenerVentaPorId,
    crearVenta,
    modificarVenta,
    eliminarVenta
  } from "../controllers/venta.controller.js";
  
const router = express.Router();
// Rutas para usuarios
router.post("/registrar", validateSchema(registerSchema), registrarUsuario);
router.post("/login", validateSchema(loginSchema), loginUsuario);
router.get("/verify", verifyTokenUsuario);
router.post("/logout", verifyTokenUsuario, logoutUsuario);
// Rutas para boletas
router.get("/boletas", listarBoletas); // Listar todas las boletas
router.get("/boletas/:id", obtenerBoletaPorId); // Obtener boleta por ID
router.post("/boletas", crearBoleta); // Crear nueva boleta
router.put("/boletas/:id", modificarBoleta); // Modificar boleta por ID
router.delete("/boletas/:id", eliminarBoleta); // Eliminar boleta por ID
// Rutas para productos
router.get("/productos", listarProductos); // Listar todos los productos
router.get("/productos/:id", obtenerProductoPorId); // Obtener producto por ID
router.get("/productos/buscar/:nombre", buscarProductoPorNombre); // Buscar producto por nombre
// Rutas para ventas
router.get("/ventas", listarVentas); // Listar todas las ventas
router.get("/ventas/:id", obtenerVentaPorId); // Obtener venta por ID
router.post("/ventas", crearVenta); // Crear nueva venta
router.put("/ventas/:id", modificarVenta); // Modificar venta por ID
router.delete("/ventas/:id", eliminarVenta); // Eliminar venta por ID
export default router;