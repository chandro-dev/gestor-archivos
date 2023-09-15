import express from 'express';
import cors from'cors' ;
import bodyParser  from 'body-parser';
const app = express();
const port = process.env.PORT || 3000;

// Configuración y middleware
app.use(express.json()); // Habilitar el análisis de JSON en las solicitudes
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
import userRoutes from'./routes/Ruser.js';
import filesRoutes from './routes/Rfiles.js';
import shareFiles from './routes/Rshare.js';
app.use('/api/users', userRoutes); // Rutas para usuarios
app.use('/api/files', filesRoutes); // Rutas para productos
app.use('/api/share', shareFiles); // Rutas para productos


// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Ocurrió un error en el servidor.' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`La aplicación está en funcionamiento en el puerto ${port}`);
});
