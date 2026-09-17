import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('Thieu bien moi truong MONGODB_URI');

  mongoose.set('strictQuery', true);
  const conn = await mongoose.connect(uri);
  console.log(`MongoDB da ket noi: ${conn.connection.host}/${conn.connection.name}`);
};
