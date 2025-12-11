// pages/api/abouts.js
export default async function handler(req, res) {
  try {
    const upstream = await fetch(
      "https://innosoft.kmutt.ac.th/api/abouts?populate=uploadfiles.fileupload&populate=mission.uploadfiles"
    );
    const data = await upstream.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(data);
  } catch (err) {
    console.error("proxy abouts error:", err);
    res.status(500).json({ error: "failed to fetch abouts" });
  }
}
