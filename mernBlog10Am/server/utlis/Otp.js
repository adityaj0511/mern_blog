const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const createOtp = (user) => {
  const otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
    digits: true,
  });

  const token = jwt.sign(
    { user, otpGenerator: otp },
    process.env.privateKey_Verfication
  );

  return { token, otp };
};

module.exports = createOtp;
