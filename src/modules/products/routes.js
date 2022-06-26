import { Router } from "express";
import { validate, verifyUser } from "../../helpers/common.js";
import validations from "./validations.js";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductsCount,
} from "./services.js";

const { createProductSchema, getProductByIdSchema } = validations;

const router = Router();
router.get("/getProducts", verifyUser, getProducts);
router.get(
  "/getProducts/:productId",
  validate(getProductByIdSchema),
  getProductById,
);
router.post("/", createProduct);
router.get("/count", getProductsCount);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export { router as productsRoutes };
