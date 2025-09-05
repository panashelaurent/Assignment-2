import errorLogger from "../helpers/error_logger.js";

const globalErrorHandler = (err, req, res, next) => {
    const emsg = `Error: ${err}, Request:${req.originalUrl}`;
    errorLogger.error(emsg);
    console.error(err.stack);
    return res.status(500).send('Failed to process request.');
};

export default globalErrorHandler;
