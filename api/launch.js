import mqtt from "mqtt";

const client = mqtt.connect("mqtt://broker.hivemq.com");

client.on("connect", () => {
  console.log("Launch API MQTT connected");
});

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  // Publish launch command to ESP32 relay
  client.publish("thrustrig/launch", "LAUNCH");

  // Auto-disarm relay after 2 seconds
  setTimeout(() => client.publish("thrustrig/launch", "OFF"), 2000);

  console.log(`[${new Date().toISOString()}] LAUNCH command sent`);

  res.status(200).json({ status: "Launch command transmitted" });
}
