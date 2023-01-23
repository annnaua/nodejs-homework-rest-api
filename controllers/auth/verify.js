const { User } = require("../../models");

const { HttpError } = require("../../helpers");

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const { email } = req.body;

  if (!email) {
    throw HttpError(400, "Missing required field email");
  }

  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    status: "Success",
    code: 200,
    message: "Verification successful",
  });
};

module.exports = verify;
