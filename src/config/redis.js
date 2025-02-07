import { createClient } from "redis";
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
    console.log("Redis Connected Successfully!");
  } catch (err) {
    console.error("❌ Redis Connection Error:", err);
  }
};

export { redisClient, connectRedis };
