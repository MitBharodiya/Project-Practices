import express, { urlencoded } from "express";
import config from "./src/config/config.js";
import {connectRedis} from "./src/config/redis.js";
import connectDB from "./src/config/db.js";
import router from "./src/router/index.js";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./src/config/swagger.js";
import cors from "cors";
import logger from "./src/utils/logger.js";


const app = express();

app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use(cors());

//mount the Routes
app.use("/api", router);

//connect DB & redis
(async () => {
  await connectRedis(); // Connect Redis before handling requests
  await connectDB();
})();

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
  // console.log(`Server running on port ${config.port}`)
});