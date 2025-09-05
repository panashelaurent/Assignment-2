import allowedOrigins from "./allowed_origins.js";

const corsOptions = {
  origin: (origin, callback) => {
    
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Opps, you are not allowed to access this resource"));
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOptions;
