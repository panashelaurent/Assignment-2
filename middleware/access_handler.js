import accessLogger from "../helpers/access_logger.js";

const accessHandler = (req, res, next) => {
  const msg = `-- Host: ${req.hostname}, Ip: ${req.ip}, Protocol: ${req.protocol}, Method: ${req.method}, Url: ${req.originalUrl} --`;
  accessLogger.info(msg);
  next();
};

export default accessHandler;
