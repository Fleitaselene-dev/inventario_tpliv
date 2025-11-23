import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { database } from './db/db';
import authRoutes from './routes/auth.routes';
import equipmentRoutes from './routes/equipment.routes';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req, _res, next) => {
  console.log(`${new Date().toLocaleTimeString()} - ${req.method} ${req.path}`);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/equipment', equipmentRoutes);


app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'API funcionando',
    database: database.estaConectado() ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});


app.get('/', (_req, res) => {
  res.json({
    message: 'Bienvenido a la API de Inventario de Equipos',
    endpoints: [
      'POST /api/auth/register',
      'POST /api/auth/login', 
      'GET /api/equipment',
      'GET /api/health'
    ]
  });
});


app.use('/not-found', (_req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Ruta no encontrada' 
  });
});


async function startServer() {
  try {
    
    database.conectar();
    
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
      console.log(`Estado DB: ${database.estaConectado() ? 'Conectado' : 'No conectado'}`);
    });
    
  } catch (error) {
    console.error('Error al iniciar:', error);
    process.exit(1);
  }
}


process.on('SIGINT', async () => {
  console.log('\nServidor deteniendose...');
  await database.desconectar();
  process.exit(0);
});

startServer();