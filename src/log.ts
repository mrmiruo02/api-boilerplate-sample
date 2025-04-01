import { QueryResult } from 'mysql2';
import path from 'path';
import fs from 'fs';

// Ensure log directory exists
const logDirectory = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Function to get the log file for today
const getLogFileName = () => {
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  return path.join(logDirectory, `app-${date}.log`);
};

// Function to format log messages
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatLogMessage = (level: string, message: object, meta?: any) => {
  return JSON.stringify({ level, message, meta }) + '\n';
};

// Function to write log messages to the file
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const writeLog = (level: string, message: object, meta?: any) => {
  const logMessage = formatLogMessage(level, message, meta);
  // eslint-disable-next-line no-console
  console.log(logMessage);
  fs.appendFile(getLogFileName(), logMessage, (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error('Error writing to log file:', err);
    }
  });
};

const createLogger = (query?: string | QueryResult) => {
  const timestamp = new Date().toISOString();
  const newDate = new Date(timestamp).toLocaleString();

  if (typeof query === 'string') {
    return writeLog('info', {
      timestamp: newDate,
      message: 'Query executed',
      sql: query,
    });
  } else {
    return writeLog('info', {
      timestamp: newDate,
      message: 'Query executed',
      result: query,
    });
  }
};

export default createLogger;
