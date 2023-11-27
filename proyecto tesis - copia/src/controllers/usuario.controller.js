import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.model.js";
import { createAccessToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../config.js";
// Registro de un nuevo usuario
export const registrarUsuario = async (req, res) => {
    const { Id_usuario, nombre, apellido, correo, contraseña } = req.body;
    try {
        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ correo });
        if (usuarioExistente) {
            return res.status(400).json({ error: "El usuario ya existe" });
        }
        // Crear un nuevo usuario
        const nuevoUsuario = new Usuario({
            Id_usuario,
            nombre,
            apellido,
            correo,
            contraseña: await bcrypt.hash(contraseña, 10),
        });
        await nuevoUsuario.save();
        // Crear access token
        const token = await createAccessToken({
            id: nuevoUsuario._id, // Cambiar por el campo correcto
        });
        res.cookie("token", token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none",
        });
        return res.status(201).json({ mensaje: "Usuario registrado exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
// Inicio de sesión de usuario
export const loginUsuario = async (req, res) => {
    const { correo, contraseña } = req.body;
    try {
        // Buscar al usuario por correo
        const usuario = await Usuario.findOne({ correo });
        // Si no se encuentra al usuario, devolver un error
        if (!usuario) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }
        // Comparar la contraseña proporcionada con la contraseña almacenada
        const coincidenciaContraseña = await bcrypt.compare(contraseña, usuario.contraseña);
        // Si las contraseñas coinciden, generar un token y enviarlo en la respuesta
        if (coincidenciaContraseña) {
            const token = jwt.sign({ id: usuario._id }, TOKEN_SECRET, { expiresIn: "1h" });
            res.cookie("token", token, {
                httpOnly: process.env.NODE_ENV !== "development",
                secure: true,
                sameSite: "none",
            });
            return res.json({ token });
        } else {
            // Si las contraseñas no coinciden, devolver un error
            return res.status(401).json({ error: "Credenciales inválidas" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
// Verificación del token del usuario
export const verifyTokenUsuario = async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.sendStatus(401); // No hay token, el usuario no está autenticado
    }
    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
        if (error) {
            return res.sendStatus(401); // El token no es válido, el usuario no está autenticado
        }
        // El token es válido, devolver información del usuario
        return res.json({
            id: user.id,
            // Agrega otros campos del usuario si es necesario
        });
    });
};
// Cierre de sesión del usuario
export const logoutUsuario = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: process.env.NODE_ENV !== "development",
        secure: true,
        sameSite: "none",
    });
    return res.sendStatus(200); // Logout exitoso
};
// Eliminar usuario por correo
export const eliminarUsuarioPorCorreo = async (req, res) => {
    const { correo } = req.body;
    try {
        // Buscar al usuario por correo
        const usuario = await Usuario.findOne({ correo });
        // Si no se encuentra al usuario, devolver un error
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        // Eliminar al usuario
        await usuario.remove();
        return res.json({ mensaje: "Usuario eliminado exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
// Modificar usuario por correo
export const modificarUsuarioPorCorreo = async (req, res) => {
    const { correo, nombre, apellido, nuevaContraseña } = req.body;
    try {
        // Buscar al usuario por correo
        const usuario = await Usuario.findOne({ correo });
        // Si no se encuentra al usuario, devolver un error
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        // Modificar los campos del usuario
        usuario.nombre = nombre || usuario.nombre;
        usuario.apellido = apellido || usuario.apellido;
        usuario.contraseña = nuevaContraseña ? await bcrypt.hash(nuevaContraseña, 10) : usuario.contraseña;
        // Guardar los cambios
        await usuario.save();
        return res.json({ mensaje: "Usuario modificado exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
// Listar todos los usuarios
export const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
