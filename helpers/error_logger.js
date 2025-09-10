import winston from "winston";
import "winston-daily-rotate-file";

const errorTransport = new winston.transports.DailyRotateFile({
  filename: "./logs/error/error-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
});

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const errorLogger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), myFormat, winston.format.json()),
  transports: [errorTransport],
});

if (process.env.NODE_ENV !== "production") {
  errorLogger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      })
  );
}

export default errorLogger;
