import { Router } from "express";
import {
  createWishlistItem,
  getWishlist,
  deleteWishlistItem,
  getWishlistCount,
} from "./services.js";
import { checkUserAuth, validate, verifyUser } from "../../helpers/common.js";
import validations from "./validations.js";

// import { validate } from '../../helpers/common.js'
// import validations from './validations.js'
const { deleteWishlistByIdSchema } = validations;

const router = Router();

router.post("/create", verifyUser, createWishlistItem); // ????? schema
router.get("/getWishlist", verifyUser, getWishlist);
router.delete(
  "/delete/:wishlistId",
  validate(deleteWishlistByIdSchema),
  verifyUser,
  deleteWishlistItem,
);
router.get("/count", checkUserAuth, getWishlistCount);

export { router as wishlistRoutes };
