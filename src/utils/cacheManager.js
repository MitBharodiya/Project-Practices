import { redisClient } from "../config/redis.js";
import logger from "../utils/logger.js";

class CacheManager {
  constructor(expirationTime = 3600) {
    this.expirationTime = expirationTime; // Default expiry: 1 hour
  }

  async getCache(key) {
    try {
      const data = await redisClient.get(key);
      if (data) {
        logger.info(`✅ Cache Hit: ${key}`);
        // console.log(`✅ Cache Hit: ${key}`);
        return JSON.parse(data);
      }
      logger.info(`❌ Cache Miss: ${key}`);
      // console.log(`❌ Cache Miss: ${key}`);
      return null;
    } catch (error) {
      logger.error("Redis Get Error:", error);
      // console.error("Redis Get Error:", error);
      return null;
    }
  }

  async setCache(key, value) {
    try {
      await redisClient.setEx(key, this.expirationTime, JSON.stringify(value));
      logger.info(`🗄️ Cached Data: ${key}`);
      // console.log(`🗄️ Cached Data: ${key}`);
    } catch (error) {
      logger.error("Redis Set Error:", error);
      // console.error("Redis Set Error:", error);
    }
  }

  async deleteCache(key) {
    try {
      await redisClient.del(key);
      logger.info(`🗑️ Cache Cleared: ${key}`);
      // console.log(`🗑️ Cache Cleared: ${key}`);
    } catch (error) {
      logger.info("Redis Delete Error:", error);
      // console.error("Redis Delete Error:", error);
    }
  }
}

export default  CacheManager;
