import { Router } from "express";
import {
  createWishlistItem,
  getWishlist,
  deleteWishlistItem,
} from "./services.js";
import { verifyUser } from "../../helpers/common.js";

// import { validate } from '../../helpers/common.js'
// import validations from './validations.js'
// const { createProductSchema, getProductByIdSchema } = validations

const router = Router();

router.post("/create/:id", verifyUser, createWishlistItem);
router.get("/getWishlist", verifyUser, getWishlist);
router.delete("/delete/:id", verifyUser, deleteWishlistItem);

export { router as wishlistRoutes };
