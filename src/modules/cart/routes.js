import { Router } from "express";
import {
  // createCartItem,
  getCartItems,
  deleteCartItem,
  upsertCartCount,
  deleteCartItems,
  getCartCount,
} from "./services.js";
import { checkUserAuth, validate, verifyUser } from "../../helpers/common.js";
import validations from "./validations.js";
const { deleteCartByIdSchema } = validations;

const router = Router();

// router.post("/create", verifyUser, createCartItem); // ????? schema
router.get("/getCartItems", verifyUser, getCartItems);
router.delete(
  "/delete/:cartId",
  validate(deleteCartByIdSchema),
  verifyUser,
  deleteCartItem,
);
router.delete("/", verifyUser, deleteCartItems);
router.put("/", verifyUser, upsertCartCount);
router.get("/count", checkUserAuth, getCartCount);

export { router as cartRoutes };
