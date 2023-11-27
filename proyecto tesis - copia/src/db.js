
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
export const connectDB = async () => {
    try {
        const startTime = Date.now(); // Guardar el tiempo de inicio de la conexión
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const endTime = Date.now(); // Guardar el tiempo de finalización de la conexión
        const latency = endTime - startTime; // Calcular la latencia en milisegundos
        console.log(`>>> Db está conectada a MongoDB Atlas. Latencia: ${latency} ms`);
        // Check if the command-line argument is 'statsdb'
        if (process.argv.includes('statsdb')) {
            // If 'statsdb' is present, show server stats and exit
            await displayServerStats();
            process.exit(0);
        }
        // Configurar un temporizador para mostrar la latencia, colecciones y métricas cada minuto
        setInterval(async () => {
            const pingStartTime = Date.now();
            const pingResult = await mongoose.connection.db.admin().ping();
            const pingEndTime = Date.now();
            console.log(`Latencia actual: ${pingEndTime - pingStartTime} ms, Estado del servidor:`, pingResult);
            // Obtener información sobre las colecciones
            const collections = await mongoose.connection.db.collections();
            console.log(">>> Colecciones en la base de datos:", collections.map(collection => collection.collectionName));
            // Métricas de rendimiento
            const performanceMetrics = await mongoose.connection.db.command({ serverStatus: 1 });
            console.log(">>> Métricas de rendimiento:", performanceMetrics);
        }, 60000); // Mostrar cada minuto (en milisegundos)
    } catch (error) {
        console.error("Error de conexión a MongoDB:", error);
        throw new Error("Error de conexión a MongoDB");
    }
};
export const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log(">>> Conexión a MongoDB cerrada");
    } catch (error) {
        console.error("Error al cerrar la conexión a MongoDB:", error);
        throw new Error("Error al cerrar la conexión a MongoDB");
    }
};
// Function to display server stats
const displayServerStats = async () => {
    try {
        // Métricas de rendimiento
        const performanceMetrics = await mongoose.connection.db.command({ serverStatus: 1 });
        console.log(">>> Métricas de rendimiento:", performanceMetrics);
        // Disconnect from the database after displaying stats
        await disconnectDB();
    } catch (error) {
        console.error("Error al mostrar las estadísticas del servidor:", error);
        process.exit(1);
    }
};