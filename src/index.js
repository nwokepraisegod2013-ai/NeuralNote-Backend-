const dotenv = require('dotenv');
dotenv.config();
const env = require('./config/env');
const app = require('./app');
const connectDB = require('./config/db');

const startServer = async () => {
  try {
    await connectDB(env.mongoUri);
    app.listen(env.port, () => {
      console.log(`NeuralNote2 backend listening on port ${env.port} in ${env.nodeEnv} mode`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
  process.exit(1);
});

startServer();
