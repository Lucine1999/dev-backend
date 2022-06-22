import { Router } from "express";
import { validate } from "../../helpers/common.js";
import validations from "./validations.js";
import {
  getAllUsers,
  getUserById,
  createUser,
  verifyUser,
  loginUser,
} from "./services.js";

const { getUserByIdSchema, createUserSchema, loginUserSchema } = validations;

const router = Router();

router.get("/", verifyUser, getAllUsers);
router.get("/:userId", validate(getUserByIdSchema), getUserById);
router.post("/signIn", validate(loginUserSchema), loginUser);
router.post("/createUser", validate(createUserSchema), createUser);
export { router as usersRoutes };
