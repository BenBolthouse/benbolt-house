const { createLogger, transports, format } = require('winston');
const morgan = require('morgan');
require('colors');

/**
 * Logger provides log level-based console and file output. Log level can be set
 * with `logger.setLevel(String)`. Some common log level options are **debug**,
 * **info**, **warn** and **error**. Default log level is **info**.
 *
 * For more information on log levels and logger methods see the winston npm
 * docs: https://www.npmjs.com/package/winston
 */
const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(i => `${i.timestamp.gray} ${i.level.toUpperCase().gray} ${i.message}`),
  ),
  transports: [new transports.Console()],
});
logger.stream = {
  write: m => logger.info(m.substring(0, m.lastIndexOf('\n'))),
};

/**
 * Injects morgan output into the logger stream. Intended for use as an argument
 * to the `express.use()` method, much like the typical morgan integration.
 */
const httpLogger = morgan(':method :url :status :response-time ms - :res[content-length]'.gray, {
  stream: logger.stream,
});

module.exports = { logger, httpLogger };
