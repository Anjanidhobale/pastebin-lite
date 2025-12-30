import { getPaste, savePaste, deletePaste } from "@/lib/db";

export async function GET(request, { params }) {
  const { id } = await params;

  const paste = await getPaste(id);

  // 1️⃣ Not found
  if (!paste) {
    return Response.json(
      { error: "Paste not found" },
      { status: 404 }
    );
  }

  const now = Date.now();

  // 2️⃣ Expired by time
  if (paste.expires_at && now > paste.expires_at) {
    await deletePaste(id);
    return Response.json(
      { error: "Paste expired" },
      { status: 410 }
    );
  }

  // 3️⃣ View limit exceeded
  if (
    paste.max_views !== null &&
    paste.view_count >= paste.max_views
  ) {
    await deletePaste(id);
    return Response.json(
      { error: "View limit exceeded" },
      { status: 410 }
    );
  }

  // 4️⃣ Increment view count
  paste.view_count += 1;
  await savePaste(id, paste);

  // 5️⃣ Return content
  return Response.json({
    id: paste.id,
    content: paste.content,
    view_count: paste.view_count,
  });
}
