import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

export async function GET() {
  try {
    await redis.set("health:test", "ok");
    return Response.json({ ok: true });
  } catch (err) {
    return Response.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
