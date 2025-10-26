export default async function handler(req, res) {
  const WEBHOOK_URL = "https://flow.zoho.in/60055442998/flow/webhook/incoming?zapikey=1001.bf00598c0cf66a89b6c7db567e4832aa.95b88fa5a1f50ebdf5efdee59681df74&isdebug=false";

  try {
    const body = await req.json();
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    res.status(200).json({ ok: true, status: response.status });
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
}
