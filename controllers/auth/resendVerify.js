const { User } = require("../../models");

const { HttpError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const resendVerify = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw HttpError(400, "Missing required field email");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (!user.verify) {
    throw HttpError(401, "Email or password invalid");
  }

  if (user.verify) {
    res.status(400).json({
      status: "Created",
      code: 400,
      message: "Verification has already been passed",
    });
  }

  const verifyEmail = {
    to: email,
    subject: "Email verification",
    html: `<a href=${BASE_URL}/api/users/verify${user.verificationToken}" target="_blank">Please click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({
    status: "Created",
    code: 200,
    message: "Verification email send",
  });
};

module.exports = resendVerify;
