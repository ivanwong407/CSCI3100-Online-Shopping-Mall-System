const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const get_logger = () => {
    // Logger Format
    const myFormat = printf(({ level, message, timestamp }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    });
    
    // Logger Setup
    const logger = createLogger({
        format: combine(
        timestamp(),
        myFormat
        ),
        transports: [new transports.Console()]
    });

    return logger
}

module.exports = {get_logger}