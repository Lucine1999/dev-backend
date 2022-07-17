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
  checkUserAuth,
  updateUserRole,
  deleteUser,
  updateUserDashboard,
} from "./services.js";

const {
  getUserByIdSchema,
  createUserSchema,
  loginUserSchema,
  updateUserRoleSchema,
  deleteUserSchema,
  updateUserDashboardSchema,
} = validations;

const router = Router();

router.get("/", verifyUser, mainAdminUserCheck, getAllUsers); // ???????? petqa get all users
router.get("/auth", verifyUser, checkUserAuth); // ???????? why checkuserauth
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
