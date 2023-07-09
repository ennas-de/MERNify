import express from "express";
// import  version routes
import v1Routes from "./v1/index.js";

const router = express.Router();

router.use("/v1", v1Routes);

export default router;
