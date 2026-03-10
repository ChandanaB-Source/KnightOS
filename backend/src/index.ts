import 'dotenv/config';
import { createServer } from 'http';
import app from './app';
import { connectDB } from './services/database';
import { initSocket } from './services/socket';
import logger from './services/logger';

const PORT = parseInt(process.env.PORT || '5000', 10);

async function main() {
  try {
    await connectDB();
    const httpServer = createServer(app);
    initSocket(httpServer);
    httpServer.listen(PORT, () => {
      logger.info(`\n♟  KnightOS API running`);
      logger.info(`   → REST:   http://localhost:${PORT}/api`);
      logger.info(`   → Health: http://localhost:${PORT}/health`);
      logger.info(`   → Socket: ws://localhost:${PORT}\n`);
    });
    const stop = () => { httpServer.close(() => process.exit(0)); };
    process.on('SIGTERM', stop);
    process.on('SIGINT', stop);
  } catch (err) {
    logger.error('Server failed to start:', err);
    process.exit(1);
  }
}
main();
