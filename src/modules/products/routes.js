import { Router } from "express";
import { adminUserCheck, validate, verifyUser } from "../../helpers/common.js";
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

const {
  createProductSchema,
  getProductByIdSchema,
  updateProductSchema,
  deleteProductSchema,
} = validations;

const router = Router();
router.get("/getShopProducts/:pageType", getShopProducts);
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
  adminUserCheck,
  validate(createProductSchema),
  createProduct,
);
router.patch(
  "/product/:productId",
  verifyUser,
  adminUserCheck,
  validate(updateProductSchema),
  updateProduct,
);
router.delete(
  "/product/:productId",
  verifyUser,
  validate(deleteProductSchema),
  deleteProduct,
);

export { router as productsRoutes };
