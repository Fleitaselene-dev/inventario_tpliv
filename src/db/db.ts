import mongoose from 'mongoose';

export class ConnectDB {
  private static instancia: ConnectDB;
  private uri: string;

  private constructor() {
    this.uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/EquipmentInventory';
  }

  static getInstancia(): ConnectDB {
    if (!ConnectDB.instancia) {
      ConnectDB.instancia = new ConnectDB();
    }
    return ConnectDB.instancia;
  }

  async conectar(): Promise<void> {
    try {
      // ! Opciones de conexión para mejor manejo
      await mongoose.connect(this.uri, {
        serverSelectionTimeoutMS: 5000, // Timeout de 5 segundos
        socketTimeoutMS: 45000,
      });
      
      console.log(`Conectado a MongoDB: ${this.uri}`);
      
    } catch (error: any) {
      console.error('Error conectando a MongoDB:', error.message);
    
    }
  }

  async desconectar(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log('🔌 Desconectado de MongoDB');
    } catch (error) {
      console.error('Error al desconectar:', error);
    }
  }

  estaConectado(): boolean {
    return mongoose.connection.readyState === 1;
  }
}

export const database = ConnectDB.getInstancia();