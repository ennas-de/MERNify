// app.js
import express from "express";
import responseTime from "response-time";
import cors from "cors";
import xss from "xss-clean";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import morgan from "morgan";
import colors from "colors";
import dotenv from "dotenv";

// Import Logs and Metrics
// Local Logger
import localLogger from "./utils/localLogger.js";
import { restResponseTimeHistogram } from "./utils/localMetrics.js";

// require Routes //
import Routes from "./routes/index.js";

// Configure environment variables //
dotenv.config();

const app = express();

// Configure App level Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

//
app.use(
  responseTime((req, res, time) => {
    if (req?.route?.path) {
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: req.statusCode,
        },
        time * 1000
      );
    }
  })
);

// Configure Routes //
app.use("/api/", Routes);

// elk stack metrics route
app.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  } catch (error) {
    localLogger.error(error.message);
  }
});

app.get("/", () => {
  res.send({
    status: "ok",
    message: "Welcome to the MERNify server",
  });
});
app.get("/api", () => {
  res.send({
    status: "ok",
    message:
      "Please do well to check out our UI through 'http://mernify.netlify.app'. Thanks.",
  });
});
app.get("/api/v1", () => {
  res.send({
    status: "ok",
    message: "Welcome to the V1 route for the MERNify project. Happy Creating.",
  });
});

// catch all routes error
app.use("*", (req, res) => {
  res.status(400).json({
    status: "failed",
    message: "Page not found.",
  });
});

// Error handling middleware //
app.use((err, req, res, next) => {
  localLogger.info(err.stack);
  res.status(500).json({
    status: "failed",
    message: "Something went wrong",
    error: err.message,
  });
});

export default app;
