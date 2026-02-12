import mqtt from "mqtt";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { factor } = req.body;

  const client = mqtt.connect("mqtt://broker.hivemq.com");

  client.on("connect", () => {
    client.publish("thrust/calibrate", String(factor));
    client.end();
    res.status(200).json({ success: true });
  });
}
