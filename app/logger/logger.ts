import { createLogger, transports, format } from 'winston';
import  DailyRotateFile from 'winston-daily-rotate-file';

const logFormatColor = format.combine(
  format.timestamp(),
  format.align(),
  format.json(),
  format.colorize(),
  format.printf(
    (data: any) => `${data.timestamp} ${data.level}: ${data.message}`
  )
);
const logFormat = format.combine(
  format.timestamp(),
  format.align(),
  format.json(),
  format.printf(
    (data: any) => `${data.timestamp} ${data.level}: ${data.message}`
  )
);

const transport1 = new DailyRotateFile({
  level: 'info',
  filename: `./logs/info/info-log-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  format: logFormat
});

const transport2 = new DailyRotateFile({
  level: 'warn',
  filename: `./logs/warn/warn-log-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  format: logFormat
});

const transport3 = new DailyRotateFile({
  level: 'error',
  filename: `./logs/error/error-log-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  format: logFormat
});

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'debug',
      format: format.combine(format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}), logFormatColor)
    }),
    transport1,
    transport2,
    transport3
  ]
});

export default logger;
