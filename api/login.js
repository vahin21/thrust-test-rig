export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { password } = req.body;
  if (password !== "Cygnus02") {
    return res.status(401).json({ error: "Invalid password" });
  }
  res.status(200).json({ success: true });
}
