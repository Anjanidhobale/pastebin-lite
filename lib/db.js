import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

export async function savePaste(id, data) {
  await redis.set(`paste:${id}`, JSON.stringify(data));
}

export async function getPaste(id) {
  const value = await redis.get(`paste:${id}`);
  return value ? JSON.parse(value) : null;
}

export async function deletePaste(id) {
  await redis.del(`paste:${id}`);
}
