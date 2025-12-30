async function getPaste(id) {
    const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/pastes/${id}`, {
  cache: "no-store",
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to load paste");
  }

  return res.json();
}

export default async function PastePage({ params }) {
  const { id } = await params;

  try {
    const paste = await getPaste(id);

    return (
      <main style={{ maxWidth: 800, margin: "40px auto", fontFamily: "monospace" }}>
        <h2>Paste ID: {paste.id}</h2>
        <pre
          style={{
            padding: 16,
            background: "#111",
            color: "#0f0",
            whiteSpace: "pre-wrap",
            borderRadius: 6,
          }}
        >
          {paste.content}
        </pre>
        <p>Views: {paste.view_count}</p>
      </main>
    );
  } catch (err) {
    return (
      <main style={{ maxWidth: 600, margin: "40px auto", textAlign: "center" }}>
        <h2>Error</h2>
        <p>{err.message}</p>
      </main>
    );
  }
}
