import { Router } from "express";
import { validate, verifyUser } from "../../helpers/common.js";
import validations from "./validations.js";
import {
  getAllUsers,
  getUserById,
  signUpUser,
  signInUser,
  signOutUser,
  checkUserAuth,
} from "./services.js";

const { getUserByIdSchema, createUserSchema, loginUserSchema } = validations;

const router = Router();

router.get("/", verifyUser, getAllUsers);
router.get("/auth", verifyUser, checkUserAuth);
router.get("/:userId", validate(getUserByIdSchema), getUserById);
router.post("/signIn", validate(loginUserSchema), signInUser);
router.post("/signUp", validate(createUserSchema), signUpUser);
router.post("/signOut", signOutUser);
export { router as usersRoutes };
