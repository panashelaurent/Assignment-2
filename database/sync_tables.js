import db from "../models/index.js";
import Router from "express";
import errorLogger from "../helpers/error_logger.js";


const syncTableRouter = Router()
syncTableRouter.get("/sync-tables", (req, res) => {
  db.sequelize
      .sync({ alter: true })
      .then(() => {
        return res.send("Tables synced successfully");
      })
      .catch((err) => {
        let emsg = `Error: ${err}, Request:${req.originalUrl}`;
        errorLogger.error(emsg);
        return res.status(500).send("There was an error syncing the tables");
      });
});



export default syncTableRouter