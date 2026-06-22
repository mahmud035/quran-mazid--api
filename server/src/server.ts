import mongoose from 'mongoose';
import app from './app';
import { config } from './config';

async function bootstrap(): Promise<void> {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log('✅ Connected to MongoDB');

    app.listen(config.port, '0.0.0.0', () => {
      console.log(`🚀 Server listening on http://0.0.0.0:${config.port}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();
