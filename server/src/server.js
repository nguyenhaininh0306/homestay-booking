import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server chay tai http://localhost:${PORT}/api`));
  } catch (error) {
    console.error('Khong the khoi dong server:', error.message);
    process.exit(1);
  }
};

start();
