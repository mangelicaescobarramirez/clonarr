import { z } from "zod";
export const registerSchema = z.object({
    correo: z.string({
        required_error: "Email es requerido",
    }).email({
        message: "Mail invalido",
    }),
    contraseña: z.string({
        required_error: "Contraseña es requerido",
    }).min(6, {
        message: "contraseña debe tener 6 caracteres",
    }),
});
export const loginSchema = z.object({
    correo: z.string().email(),
    contraseña: z.string().min(6),
  });