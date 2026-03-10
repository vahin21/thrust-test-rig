import mqtt from "mqtt";

let latestValue = 0;
let lastUpdate = 0;

const client = mqtt.connect("mqtt://broker.hivemq.com");

client.on("connect", () => {
  client.subscribe("thrustrig/loadcell1");
});

client.on("message", (topic, message) => {
  if (topic === "thrustrig/loadcell1") {
    latestValue = parseFloat(message.toString());
    lastUpdate = Date.now();
  }
});

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const dataFresh = (Date.now() - lastUpdate) < 3000;
  const loadValid = !isNaN(latestValue);

  if (!dataFresh || !loadValid) {
    return res.status(403).json({ error: "Load cell offline. Cannot fire." });
  }

  // Pulse relay: ON then OFF after 1 second
  client.publish("thrustrig/fire", "ON");
  setTimeout(() => client.publish("thrustrig/fire", "OFF"), 10000);

  res.status(200).json({ status: "Ignition triggered" });
}

