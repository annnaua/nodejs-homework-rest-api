const express = require("express");

const { authenticate, validateSchema, upload } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const { auth: ctrl } = require("../../controllers");
const { schemas } = require("../../schemas/schemasValidation");

const router = express.Router();

router.post(
  "/signup",
  validateSchema(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));

router.post("/verify", ctrlWrapper(ctrl.resendVerify));

router.post(
  "/login",
  validateSchema(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  validateSchema(schemas.subscriptionSchema),
  authenticate,
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
