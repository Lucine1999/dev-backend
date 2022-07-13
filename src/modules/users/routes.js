import { Router } from "express";
import {
  validate,
  verifyUser,
  adminUserCheck,
  mainAdminUserCheck,
} from "../../helpers/common.js";
import validations from "./validations.js";
import {
  getAllUsers,
  getUserById,
  signUpUser,
  signInUser,
  signOutUser,
  checkUserAuth,
  updateUserRole,
  deleteUser,
  updateUserPersonalInfo,
  updateUserPassword
} from "./services.js";

const {
  getUserByIdSchema,
  createUserSchema,
  loginUserSchema,
  updateUserRoleSchema,
  deleteUserSchema,
  updateUserPersonalInfoSchema,
  updateUserPasswordSchema,
} = validations;

const router = Router();

router.get("/", verifyUser, mainAdminUserCheck, getAllUsers);
router.get("/auth", verifyUser, checkUserAuth);
router.get("/:userId", validate(getUserByIdSchema), getUserById);
router.post("/signIn", validate(loginUserSchema), signInUser);
router.post("/signUp", validate(createUserSchema), signUpUser);
router.post("/signOut", signOutUser);
router.patch(
  "/personalInfo",
  verifyUser,
  validate(updateUserPersonalInfoSchema),
  updateUserPersonalInfo,
);
router.patch(
  "/password",
  verifyUser,
  validate(updateUserPasswordSchema),
  updateUserPassword,
);
router.patch(
  "/user/:userId",
  verifyUser,
  validate(updateUserRoleSchema),
  updateUserRole,
);
router.delete(
  "/user/:userId",
  verifyUser,
  validate(deleteUserSchema),
  deleteUser,
);
export { router as usersRoutes };
