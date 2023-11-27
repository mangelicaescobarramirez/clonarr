
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Administrador from "../models/administrador.model.js";
import { TOKEN_SECRET } from "../config.js"; 
import { createAccessToken } from "../libs/jwt.js";
import Usuario from "../models/usuario.model.js"
export const register = async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;
    const adminExistente = await Administrador.findOne({ correo });
    if (adminExistente)
      return res.status(400).json({
        message: ["El correo ya está en uso"],
      });
    // hashing the password
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    // creating the admin
    const nuevoAdmin = new Administrador({
      nombre,
      correo,
      contraseña: hashedPassword,
      rol: rol || 'administrador',
    });
    // saving the admin in the database
    const adminGuardado = await nuevoAdmin.save();
    // create access token
    const token = await createAccessToken({
      id: adminGuardado._id,
      rol: adminGuardado.rol,
    });
    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });
    res.json({
      id: adminGuardado._id,
      nombre: adminGuardado.nombre,
      correo: adminGuardado.correo,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    const admin = await Administrador.findOne({ correo });
    if (!admin)
      return res.status(400).json({
        message: ["El correo no existe"],
      });
    const isMatch = await bcrypt.compare(contraseña, admin.contraseña);
    if (!isMatch) {
      return res.status(400).json({
        message: ["La contraseña es incorrecta"],
      });
    }
    const token = await createAccessToken({
      id: admin._id,
      rol: admin.rol,
    });
    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });
    res.json({
      id: admin._id,
      nombre: admin.nombre,
      correo: admin.correo,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const listar = async (req, res) => {
  try {
    const administradores = await Administrador.find();
    res.json(administradores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
export const modificar = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, contraseña, rol } = req.body;
  try {
    const adminModificado = await Administrador.findByIdAndUpdate(
      id,
      { nombre, correo, contraseña, rol },
      { new: true }
    );
    if (!adminModificado) {
      return res.status(404).json({ error: "Administrador no encontrado" });
    }
    res.json({ mensaje: "Administrador modificado exitosamente", adminModificado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
export const eliminar = async (req, res) => {
  const { id } = req.params;
  try {
    const adminEliminado = await Administrador.findByIdAndRemove(id);
    if (!adminEliminado) {
      return res.status(404).json({ error: "Administrador no encontrado" });
    }
    res.json({ mensaje: "Administrador eliminado exitosamente", adminEliminado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);
  jwt.verify(token, TOKEN_SECRET, async (error, admin) => {
    if (error) return res.sendStatus(401);
    const adminEncontrado = await Administrador.findById(admin.id);
    if (!adminEncontrado) return res.sendStatus(401);
    return res.json({
      id: adminEncontrado._id,
      nombre: adminEncontrado.nombre,
      correo: adminEncontrado.correo,
    });
  });
};
export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};
