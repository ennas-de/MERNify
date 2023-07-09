import logger from "pino";
import dayjs from "dayjs";

const localLogger = logger({
  base: {
    pid: false,
  },
  timestamp: () => `, "time": "${dayjs().format()}"`,
});

export default localLogger;
