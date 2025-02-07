import { redisClient } from "./redisClient.js";

class CacheManager {
  constructor(expirationTime = 3600) {
    this.expirationTime = expirationTime; // Default expiry: 1 hour
  }

  async getCache(key) {
    try {
      const data = await redisClient.get(key);
      if (data) {
        console.log(`✅ Cache Hit: ${key}`);
        return JSON.parse(data);
      }
      console.log(`❌ Cache Miss: ${key}`);
      return null;
    } catch (error) {
      console.error("Redis Get Error:", error);
      return null;
    }
  }

  async setCache(key, value) {
    try {
      await redisClient.setEx(key, this.expirationTime, JSON.stringify(value));
      console.log(`🗄️ Cached Data: ${key}`);
    } catch (error) {
      console.error("Redis Set Error:", error);
    }
  }

  async deleteCache(key) {
    try {
      await redisClient.del(key);
      console.log(`🗑️ Cache Cleared: ${key}`);
    } catch (error) {
      console.error("Redis Delete Error:", error);
    }
  }
}

export default new CacheManager();
