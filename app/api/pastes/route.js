import { savePaste } from "@/lib/db";
import crypto from "crypto";

export async function POST(request) {
  try {
    const body = await request.json();
    const { content, ttl_seconds, max_views } = body;

    // 1️⃣ Validate content
    if (!content || typeof content !== "string" || content.trim() === "") {
      return Response.json(
        { error: "content is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    // 2️⃣ Validate ttl_seconds
    if (
      ttl_seconds !== undefined &&
      (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)
    ) {
      return Response.json(
        { error: "ttl_seconds must be an integer >= 1" },
        { status: 400 }
      );
    }

    // 3️⃣ Validate max_views
    if (
      max_views !== undefined &&
      (!Number.isInteger(max_views) || max_views < 1)
    ) {
      return Response.json(
        { error: "max_views must be an integer >= 1" },
        { status: 400 }
      );
    }

    // 4️⃣ Generate ID
    const id = crypto.randomUUID().slice(0, 8);

    const now = Date.now();
    const expires_at =
      ttl_seconds !== undefined ? now + ttl_seconds * 1000 : null;

    // 5️⃣ Create paste object
    const paste = {
      id,
      content,
      created_at: now,
      expires_at,
      max_views: max_views ?? null,
      view_count: 0,
    };

    // 6️⃣ Save to Redis
    await savePaste(id, paste);

    // 7️⃣ Build response URL
    const host = request.headers.get("host");
    const protocol = host?.includes("localhost") ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    const url = `${baseUrl}/p/${id}`;

    return Response.json({ id, url }, { status: 201 });
  } catch (err) {
    return Response.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }
}
