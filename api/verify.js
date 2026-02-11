export default function handler(req, res) {

  const { otp } = req.body;

  if (parseInt(otp) === otpStore) {
    return res.status(200).json({ verified: true });
  }

  res.status(401).json({ error: "Invalid OTP" });
}
