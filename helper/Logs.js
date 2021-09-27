const log4js = require("log4js");
log4js.configure({
  appenders: {
    default: { type: "file", filename: "LOGS/default.log" },
    claireError: { type: "file", filename: "LOGS/claireError.log" },
    claireTrace: { type: "file", filename: "LOGS/claireTrace.log" },
  },
  categories: {
    default: { appenders: ["default"], level: "info" },
    claireError: { appenders: ["claireError"], level: "error" },
    claireTrace: { appenders: ["claireTrace"], level: "trace" },
  },
});

const claireError = log4js.getLogger("claireError");
const claireTrace = log4js.getLogger("claireTrace");

module.exports = { claireError, claireTrace };
