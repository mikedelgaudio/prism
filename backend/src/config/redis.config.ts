import { createClient } from "redis";

const REDIS_URL = process.env?.REDIS_URL ?? "redis://localhost:6379";
const redisClient = createClient({
  url: REDIS_URL,
});

async function initRedis(): Promise<void> {
  try {
    await redisClient.connect();
    console.info("[REDIS] Connection successful.");
  } catch (e) {
    console.info("[REDIS] Connection failed.", e);
  }
}

export { redisClient, initRedis };
