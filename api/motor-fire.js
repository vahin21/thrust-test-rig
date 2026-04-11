import mqtt from "mqtt";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const client = mqtt.connect("mqtt://broker.hivemq.com");
  client.on("connect", () => {
    client.publish("thrustrig/fire", "ON");
    client.end();
    res.status(200).json({ status: "Fired" });
  });
}
