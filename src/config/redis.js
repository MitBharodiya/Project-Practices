import { createClient } from "redis";
import logger from "../utils/logger.js";
import config from "./config.js";

const redisClient = createClient({
  username: config.redis.username,
  password:config.redis.password,
  socket: {
    host: config.redis.host,
    port: Number(config.redis.port),
  },
  // url: config.redis.url
});

redisClient.on("error", (err) => console.error("❌ Redis Error:", err));

const connectRedis = async () => {
  try {
    await redisClient.connect();
    logger.info("Redis Connected Successfully!");
    // console.log("Redis Connected Successfully!");
  } catch (err) {
    logger.error("❌ Redis Connection Error:", err);
    // console.error("❌ Redis Connection Error:", err);
  }
};

export { redisClient, connectRedis };
