import { Router } from "express";
// import { validate } from '../../helpers/common.js'
// import validations from './validations.js'
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "./services.js";

// const { createProductSchema, getProductByIdSchema } = validations

const router = Router();

router.post("/", createCategory);
router.get("/getCategories", getCategories);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);

export { router as categoriesRoutes };
