import { Router } from "express";
import { validate, verifyUser } from "../../helpers/common.js";
import validations from "./validations.js";
import {
  createProduct,
  getShopProducts,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProductsCount,
  getHighestPrice,
} from "./services.js";

const { createProductSchema, getProductByIdSchema } = validations;

const router = Router();
router.get("/getShopProducts", getShopProducts);
router.get(
  "/getProducts/:productId",
  validate(getProductByIdSchema),
  getProductById,
);
router.get("/getHighestPrice", getHighestPrice);
router.post("/", createProduct);
router.get("/count", getAllProductsCount);
router.post(
  "/product",
  verifyUser,

  validate(createProductSchema),
  createProduct,
);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export { router as productsRoutes };
