export default async function handler(req, res) {
  try {
    // Read the raw body correctly
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const rawBody = Buffer.concat(chunks).toString();
    const body = rawBody ? JSON.parse(rawBody) : {};

    const WEBHOOK_URL = "https://flow.zoho.in/60055442998/flow/webhook/incoming?zapikey=1001.bf00598c0cf66a89b6c7db567e4832aa.95b8fa5a1f50ebdf5efdee59681df74&isdebug=false";

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    return res.status(200).json({ ok: true, proxied_status: response.status });
  } catch (err) {
    console.error("Proxy error:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
