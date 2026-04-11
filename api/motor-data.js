import mqtt from "mqtt";

let thrust = 0;
let lastUpdate = 0;

const client = mqtt.connect("mqtt://broker.hivemq.com");
client.on("connect", () => client.subscribe("thrustrig/loadcell1"));
client.on("message", (topic, msg) => {
  thrust = parseFloat(msg.toString()) || 0;
  lastUpdate = Date.now();
});

export default function handler(req, res) {
  res.status(200).json({ thrust, lastUpdate });
}
