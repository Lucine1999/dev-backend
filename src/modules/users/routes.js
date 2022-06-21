import { Router } from "express";
import { validate } from "../../helpers/common.js";
import validations from "./validations.js";
import {
  getAllUsers,
  getUserById,
  createUser,
  verifyUser,
} from "./services.js";

const { getUserByIdSchema, createUserSchema } = validations;

const router = Router();

router.get("/", getAllUsers);
router.get("/:userId", validate(getUserByIdSchema), getUserById);
router.post("/createUser", validate(createUserSchema), createUser);
router.post("/verifyUser", verifyUser);
export { router as usersRoutes };
