import { Router } from "express";
import { getPublishableKey, createPaymentIntent } from "./services.js";
import { validate, verifyUser } from "../../helpers/common.js";
import validations from "./validations.js";
const { createPaymentIntentSchema } = validations;

const router = Router();

router.get("/config", verifyUser, getPublishableKey);
router.post(
  "/",
  verifyUser,
  validate(createPaymentIntentSchema),
  createPaymentIntent,
);

export { router as paymentRoutes };
