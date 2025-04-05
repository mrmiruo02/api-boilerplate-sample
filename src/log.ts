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
  let safeMessage: string;

  try {
    safeMessage = JSON.stringify({ level, message }, null, 2);
  } catch (err) {
    safeMessage = JSON.stringify({
      level,
      message: 'Error serializing log message',
      error: err,
    });
  }

  return safeMessage + '\n';
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
 * @param {string} query
 * @returns {void}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createLogger = (logger: { timestamp: string; message: string; details?: any; result?: any }): void => {
  // If the result is a stringified JSON, parse it to format it
  if (logger.result && typeof logger.result === 'string') {
    try {
      logger.result = JSON.parse(logger.result); // Parse the result to object
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error parsing result:', err);
    }
  }
  return writeLog('info', logger);
};

/**
 *
 * @param {any} error
 * @returns {void}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorLogger = (error: any): void => {
  const timestamp = new Date().toISOString();
  const newDate = new Date(timestamp).toLocaleString();

  return writeLog('error', {
    timestamp: newDate,
    message: 'Error occurred',
    error: error.message,
  });
};

export { createLogger, errorLogger };
