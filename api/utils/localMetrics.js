import express from "express";
import client from "prom-client";
import localLogger from "./localLogger.js";

const app = express();

export const restResponseTimeHistogram = new client.Histogram({
  name: "rest_response_time_duration_seconds",
  help: "REST API response time for in seconds",
  labelNames: ["method", "route", "status_code"],
});

export const databaseResponseTimeHistogram = new client.Histogram({
  name: "db_response_time_duration_seconds",
  help: "Database response time in seconds",
  labelNames: ["operation", "success"],
});

export function startMetricsServer() {
  const collectDefaultMetrics = client.collectDefaultMetrics;

  collectDefaultMetrics();

  app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);

    return res.send(await client.register.metrics());
  });

  const port = 9100;

  app.listen(port, () => {
    localLogger.info(`Metrics server started at http://localhost:${port}`);
    // console.log("Metrics server started at http://localhost:9100");
  });
}
