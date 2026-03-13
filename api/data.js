import mqtt from "mqtt";

let lastUpdate = 0;

const client = mqtt.connect("mqtt://broker.hivemq.com");

client.on("connect", () => {
  client.subscribe("thrustrig/heartbeat");
});

client.on("message", () => {
  lastUpdate = Date.now();
});

export default function handler(req, res) {
  res.status(200).json({ lastUpdate });
}
