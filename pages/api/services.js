// pages/api/services.js  ← Pages Router
export default async function handler(req, res) {
  try {
    const upstream = await fetch(
      "https://innosoft.kmutt.ac.th/api/services?populate=uploadfiles.fileupload",
      { cache: "no-store", headers: { Accept: "application/json" } }
    );

    // ส่งต่อ error จาก upstream ให้ชัดเจน
    const raw = await upstream.text();
    if (!upstream.ok) {
      res
        .status(upstream.status)
        .setHeader("Content-Type", upstream.headers.get("content-type") || "application/json")
        .send(raw || JSON.stringify({ error: "upstream error" }));
      return;
    }

    const data = raw ? JSON.parse(raw) : { data: [] };
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json(data);
  } catch (e) {
    console.error("proxy /api/services error:", e);
    res.status(500).json({ error: "failed to fetch services" });
  }
}
