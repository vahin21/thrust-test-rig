import mqtt from "mqtt";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const client = mqtt.connect("mqtt://broker.hivemq.com");
  client.on("connect", () => {
    client.publish("thrustrig/fire", "OFF");
    client.end();
    res.status(200).json({ status: "Off" });
  });
}
