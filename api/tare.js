import mqtt from "mqtt";

const client = mqtt.connect("mqtt://broker.hivemq.com");

export default function handler(req, res) {
  client.publish("thrustrig/tare", "TARE");
  res.status(200).json({ status: "Tare command sent" });
}
