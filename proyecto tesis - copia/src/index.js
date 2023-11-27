// Importa la instancia de la aplicación Express desde el archivo 'app.js'
import app from './app.js';
// Importa la función 'connectDB' desde el archivo 'db.js'
import { connectDB } from './db.js';
// Llama a la función 'connectDB' para establecer la conexión con la base de datos
connectDB();
// Inicia el servidor de la aplicación Express en el puerto 3000
app.listen(3000);
// Muestra un mensaje en la consola indicando que el servidor está en línea
console.log('Server on port', 3000);