import express from "express";
import morganLogger from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import credentials from "./middleware/credentials.js";
import cors from "cors";
import globalErrorHandler from "./middleware/global_error_handler.js";
import corsOptions from "./config/cors_options.js";
import accessHandler from "./middleware/access_handler.js";
import helmetConfig from "./config/helmet_config.js";
import syncTableRouter from "./database/sync_tables.js";
import fixtureRouter from "./routes/fixtureRoutes.js";


const PORT = process.env.PORT || 5000;

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000, // 1hr
  message: "Too many requests from this IP. Please try again later.",
});

setInterval(async () => {
  try {
    const deletedCount = await tokenHelper.cleanupExpiredTokens();
    if (deletedCount > 0) {
      console.log(`Cleaned up ${deletedCount} expired tokens`);
    }
  } catch (error) {
    console.error("Error cleaning up expired tokens:", error);
  }
}, 24 * 60 * 60 * 1000); 

const app = express();

app.use(morganLogger("tiny"));
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");
app.use(helmet(helmetConfig));
app.use(cookieParser());
app.use(accessHandler);
app.use(globalErrorHandler);
app.use("/setup", syncTableRouter);
app.use("/api/v1/fixtures", fixtureRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Fantasy Premier League API");
});


app.listen(PORT, async () => {
  console.log(
      `Fantasy Premier League API is running on http://localhost:${PORT}`
  );
});

export default app;
