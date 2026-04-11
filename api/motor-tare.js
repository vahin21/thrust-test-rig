import mqtt from "mqtt";

export default function handler(req, res) {
  const client = mqtt.connect("mqtt://broker.hivemq.com");
  client.on("connect", () => {
    client.publish("thrustrig/tare", "TARE");
    client.end();
    res.status(200).json({ success: true });
  });
}
