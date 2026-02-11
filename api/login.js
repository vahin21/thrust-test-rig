let otpStore = null;

export default function handler(req, res) {

  const { password } = req.body;

  if (password !== "Thrust@123") {
    return res.status(401).json({ error: "Wrong password" });
  }

  otpStore = Math.floor(100000 + Math.random() * 900000);

  console.log("OTP:", otpStore);

  res.status(200).json({ message: "OTP generated" });
}
