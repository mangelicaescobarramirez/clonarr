import express from "express";  // Framework web
import morgan from 'morgan';  // Middleware para registrar solicitudes HTTP
import cors from 'cors';  // Para habilitar CORS
import cookieParser from "cookie-parser"; // para leer cookies y proteger rutas
import path from 'path';  // Importa la biblioteca path para manejar rutas
import administracionroutes from "./routes/administrador.routes.js";
import usuarioroutes from  "./routes/usuario.routes.js";
// Obtener el directorio actual del archivo
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Crear una instancia de la aplicación Express
const app = express();
// Configuración de CORS para permitir todos los métodos desde cualquier origen
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
// Ruta de inicio para enviar el archivo HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
// Middleware Morgan para registrar solicitudes HTTP en consola
app.use(morgan('dev'));
// Middleware para manejar datos JSON en las solicitudes
app.use(express.json());
// leer cookies
app.use(cookieParser());
// Usar las rutas
app.use("/apiadm", administracionroutes);
app.use("/api", usuarioroutes);
// Middleware para mostrar estadísticas básicas del servidor
app.use((req, res, next) => {
    console.log('--- Server Stats ---');
    console.log('Memory Usage:', process.memoryUsage());
    console.log('Uptime:', process.uptime(), 'seconds');
    console.log('CPU Usage:', process.cpuUsage());
    console.log('---------------------');
    next();
  });
// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error('Error:', err);
    // Puedes personalizar la respuesta de error según tus necesidades
    res.status(500).json({ error: 'Internal Server Error' });
});
// Exportar la instancia de la aplicación Express
export default app;