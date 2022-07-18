import { Router } from "express";
import {
  validate,
  verifyUser,
  mainAdminUserCheck,
} from "../../helpers/common.js";
import validations from "./validations.js";
import {
  getAllUsers,
  getUserById,
  signUpUser,
  signInUser,
  signOutUser,
  sendUserAuth,
  updateUserRole,
  deleteUser,
  updateUserDashboard,
  getUserData,
  updateUserPersonalInfo,
  updateUserPassword,
} from "./services.js";

const {
  getUserByIdSchema,
  createUserSchema,
  loginUserSchema,
  updateUserRoleSchema,
  deleteUserSchema,
  updateUserDashboardSchema,
  updateUserPersonalInfoSchema,
  updateUserPasswordSchema,
} = validations;

const router = Router();

router.get("/", verifyUser, mainAdminUserCheck, getAllUsers);
router.get("/auth", verifyUser, sendUserAuth);
router.get("/getUserData", verifyUser, getUserData);
router.get("/:userId", validate(getUserByIdSchema), getUserById);
router.post("/signIn", validate(loginUserSchema), signInUser);
router.post("/signUp", validate(createUserSchema), signUpUser);
router.post("/signOut", signOutUser);
router.put(
  "/user/:userId",
  verifyUser,
  validate(updateUserDashboardSchema),
  updateUserDashboard,
);
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
