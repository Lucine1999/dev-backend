import { Router } from "express";
import { validate, verifyUser } from "../../helpers/common.js";
import validations from "./validations.js";
import {
  createProduct,
  getProducts,
  // getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductsCount,
} from "./services.js";

const { createProductSchema, getProductByIdSchema } = validations;
import { adminUserCheck } from "../../helpers/common.js";
const router = Router();

router.get("/getProducts", getProducts);

router.get(
  "/getProducts/:productId",
  validate(getProductByIdSchema),
  getProductById,
);
router.post(
  "/product",
  verifyUser,

  validate(createProductSchema),
  createProduct,
);

router.get("/count", getProductsCount);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export { router as productsRoutes };
