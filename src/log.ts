import { QueryResult } from 'mysql2';
import path from 'path';
import fs from 'fs';

// Ensure log directory exists
const logDirectory = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

/**
 * Function to get the log file for today
 * @returns {string}
 */
const getLogFileName = (): string => {
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  return path.join(logDirectory, `app-${date}.log`);
};

/**
 * Function to format log messages
 * @param {string} level
 * @param {object} message
 * @returns {string}
 */

const formatLogMessage = (level: string, message: object): string => {
  return JSON.stringify({ level, message }) + '\n';
};

/**
 * Function to write log messages to the file
 * @param {string} level
 * @param {object} message
 */

const writeLog = (level: string, message: object) => {
  const logMessage = formatLogMessage(level, message);
  // eslint-disable-next-line no-console
  console.log(logMessage);
  fs.appendFile(getLogFileName(), logMessage, (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error('Error writing to log file:', err);
    }
  });
};

/**
 * create a log file with message
 * @param {string | QueryResult} query
 * @returns {void}
 */
const createLogger = (query?: string | QueryResult): void => {
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
