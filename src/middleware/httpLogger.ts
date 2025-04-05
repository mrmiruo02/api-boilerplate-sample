import morgan from 'morgan';
import { createLogger } from '../log';

// Stream for morgan to write to winston
const stream = {
  write: (message: string) => {
    const timestamp = new Date().toLocaleString();
    createLogger({
      timestamp,
      message: 'HTTP Request',
      details: message.trim(),
    });
  },
};

// Log only non-test environments
const httpLogger = morgan(':method :url :status :res[content-length] - :response-time ms', {
  stream,
});

export default httpLogger;
