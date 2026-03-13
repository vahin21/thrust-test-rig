import mqtt from "mqtt";

const client = mqtt.connect("mqtt://broker.hivemq.com");

client.on("connect", () => {
  client.subscribe("thrustrig/loadcell1");
});

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  client.publish("thrustrig/fire", "ON");
  setTimeout(() => client.publish("thrustrig/fire", "OFF"), 10000);

  res.status(200).json({ status: "Ignition triggered" });
}
