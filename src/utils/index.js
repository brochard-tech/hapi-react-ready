const log4js = require("log4js"),
  path = require("path"),
  moment = require("moment");


log4js.configure({
  appenders: {
    out: {
      type: "stdout"
    },
    app: {
      type: "file",
      filename: path.join(__dirname, "..", "..", "logs", `${moment(Date.now()).format("MM-YYYY")}.log`)
    }
  },
  categories: {
    default: {
      appenders: ["out", "app"],
      level: "info"
    }
  }
});


/**
 * Create a log
 * @param {String} message: message of the log
 * @param {String=} level: type of the message ("info", "warn" or "error")
 * @returns {void}
 */
exports.log = (message, level = "info") => {
  const logger = log4js.getLogger();

  logger.level = level;
  logger[level](message);
};


/**
 * Filter undefined properties of an object
 * @param {*} obj - The object to check
 * @returns {*} A new obj without undefined properties
 */
exports.filterUndefinedProperties = (obj = {}) => {
  const result = {};

  Object.keys(obj)
    .filter(key => typeof obj[key] !== "undefined")
    .forEach((key) => {
      result[key] = obj[key];
    });

  return result;
};


/**
 * Define the limit of the value
 * @param {Number} value - The value
 * @param {Number} min - The minimum of the value
 * @param {Number} max - The maximum of the value
 * @returns {Number} The value limited
 */
exports.limit = (value, min, max) => Math.max(min, Math.min(max, value));
