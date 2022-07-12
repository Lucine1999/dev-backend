import { Router } from "express";
import { validate } from "../../helpers/common.js";
import validations from "./validations.js";
import {
  createContactMessages,
  getContactMessages,
  deleteContactMessage,
} from "./services.js";
import {
  verifyUser,
  adminUserCheck,
  checkUserAuth,
} from "../../helpers/common.js";

const { createContactSchema, deleteContactSchema } = validations;
const router = Router();

router.get("/", getContactMessages);
router.post(
  "/contact",
  checkUserAuth,
  validate(createContactSchema),
  createContactMessages,
);
router.delete(
  "/contact/:contactId",
  verifyUser,
  adminUserCheck,
  validate(deleteContactSchema),
  deleteContactMessage,
);

export { router as contactUsRoutes };
