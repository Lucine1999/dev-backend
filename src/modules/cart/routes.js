import { Router } from "express";
import {
  createCartItem,
  getCartItems,
  deleteCartItem,
  updateCartCount,
} from "./services.js";
import { validate, verifyUser } from "../../helpers/common.js";
import validations from "./validations.js";
const { deleteCartByIdSchema } = validations;

const router = Router();

router.post("/create", verifyUser, createCartItem); // ????? schema
router.get("/getCartItems", verifyUser, getCartItems);
router.delete(
  "/delete/:cartId",
  validate(deleteCartByIdSchema),
  verifyUser,
  deleteCartItem,
);
router.put("/count/:id", verifyUser, updateCartCount);

export { router as cartRoutes };
