import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/inventario';
    
    await mongoose.connect(mongoURI);
    
    console.log('✅ MongoDB conectado');
  } catch (error) {
    console.error(' Error conectando a MongoDB:', error);
    process.exit(1);
  }
};