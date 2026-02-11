import mqtt from "mqtt";

const client = mqtt.connect("mqtt://broker.hivemq.com");

export default function handler(req, res) {

  const { weight } = req.body;

  if (!weight) {
    return res.status(400).json({ error: "Weight required" });
  }

  client.publish("thrustrig/calibrate", weight.toString());

  res.status(200).json({ status: "Calibration command sent" });
}
