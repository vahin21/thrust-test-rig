import mqtt from "mqtt";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { weight } = req.body;
  if (!weight || weight <= 0) return res.status(400).json({ error: "Invalid weight" });

  const client = mqtt.connect("mqtt://broker.hivemq.com");
  client.on("connect", () => {
    client.publish("thrustrig/calibrate", String(weight));
    client.end();
    res.status(200).json({ success: true });
  });
}
