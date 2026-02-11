import mqtt from "mqtt";

let latestValue = 0;
let calibrationValue = 0;
let lastUpdate = 0;

const client = mqtt.connect("mqtt://broker.hivemq.com");

client.on("connect", () => {
  client.subscribe("thrustrig/loadcell1");
  client.subscribe("thrustrig/cal_result");
});

client.on("message", (topic, message) => {
  if (topic === "thrustrig/loadcell1") {
    latestValue = parseFloat(message.toString());
    lastUpdate = Date.now();
  }

  if (topic === "thrustrig/cal_result") {
    calibrationValue = message.toString();
  }
});

export default function handler(req, res) {
  res.status(200).json({
    thrust: latestValue,
    calibration: calibrationValue,
    lastUpdate
  });
}
