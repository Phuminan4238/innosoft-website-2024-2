// pages/api/teams.js
export default async function handler(req, res) {
  try {
    const upstream = await fetch(
      "https://innosoft.kmutt.ac.th/api/teams?populate=uploadfiles"
    );
    const data = await upstream.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(data);
  } catch (err) {
    console.error("proxy teams error:", err);
    res.status(500).json({ error: "failed to fetch teams" });
  }
}
