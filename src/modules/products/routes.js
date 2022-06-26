import { Router } from "express";
import { validate } from "../../helpers/common.js";
import validations from "./validations.js";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductById,
} from "./services.js";

const { createProductSchema, getProductByIdSchema } = validations;

const router = Router();
router.get("/getProducts", getProducts);
router.get(
  "/getProducts/:productId",
  validate(getProductByIdSchema),
  getProductById,
);
router.post("/", createProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export { router as productsRoutes };
