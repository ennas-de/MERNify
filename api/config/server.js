import app from "./../app.js";
import connectDB from "./db.js";
import dotenv from "dotenv";
import localLogger from "../utils/localLogger.js";
import { startMetricsServer } from "./../utils/localMetrics.js";

dotenv.config();

const port = process.env.PORT || 3001;

app.listen(port, async () => {
  await connectDB();
  startMetricsServer();

  localLogger.info(
    `The Mern-Auth Server is running in "${process.env.DEV_MODE}" Mode on port number ${port}`
      .bgBlack.white
  );
  console.log(
    `The Mern-Auth Server is running in "${process.env.DEV_MODE}" Mode on port number ${port}`
      .bgBlack.white
  );
});
