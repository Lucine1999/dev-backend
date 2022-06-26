import { Router } from "express";
import { validate } from "../../helpers/common.js";
import validations from "./validations.js";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "./services.js";

import { verifyUser } from "../users/services.js";

const { createCategorySchema, deleteCategorySchema, updateCategorySchema } =
  validations;

const router = Router();

router.get("/", verifyUser, getCategories);
router.post(
  "/category",
  verifyUser,
  validate(createCategorySchema),
  createCategory,
);
router.patch(
  "/category/:categoryId",
  verifyUser,
  validate(updateCategorySchema),
  updateCategory,
);
router.delete(
  "/category/:categoryId",
  verifyUser,
  validate(deleteCategorySchema),
  deleteCategory,
);

export { router as categoriesRoutes };
