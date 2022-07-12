import { Router } from "express";
import { validate } from "../../helpers/common.js";
import validations from "./validations.js";
import {
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
} from "./services.js";
import { verifyUser, adminUserCheck } from "../../helpers/common.js";

const { createBrandSchema, deleteBrandSchema, updateBrandSchema } = validations;
const router = Router();

router.get("/", getBrands);
router.post(
  "/brand",
  verifyUser,
  adminUserCheck,
  validate(createBrandSchema),
  createBrand,
);
router.patch(
  "/brand/:brandId",
  verifyUser,
  adminUserCheck,
  validate(updateBrandSchema),
  updateBrand,
);
router.delete(
  "/brand/:brandId",
  verifyUser,
  adminUserCheck,
  validate(deleteBrandSchema),
  deleteBrand,
);

export { router as brandsRoutes };
