import configs from ".";
import * as Redis from "ioredis";

class RedisClient {
  private static instance: RedisClient;
  private cache!: Redis.Redis;
  constructor() {
    this.connectToRedis();
  }

  private async connectToRedis(): Promise<void> {
    this.cache = new Redis.Redis({
      host: configs.cacheHost,
      port: parseInt(configs.cachePort as string),
    });

    try {
      await this.cache.ping();
      console.log("Redis initialized successfully.");
    } catch (err) {
      console.error("Error initializing Redis:", err);
      process.exit(1);
    }
  }

  public static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }
    return RedisClient.instance;
  }

  public getCache(): Redis.Redis {
    return this.cache;
  }
}

export default RedisClient.getInstance();
