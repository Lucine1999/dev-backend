import { Router } from "express";
import { validate } from "../../helpers/common.js";
import validations from "./validations.js";
import {
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
} from "./services.js";

import { verifyUser } from "../users/services.js";

const { createBrandSchema, deleteBrandSchema, updateBrandSchema } = validations;

const router = Router();

router.get("/", verifyUser, getBrands);
router.post("/brand", verifyUser, validate(createBrandSchema), createBrand);
router.patch(
  "/brand/:brandId",
  verifyUser,
  validate(updateBrandSchema),
  updateBrand,
);
router.delete(
  "/brand/:brandId",
  verifyUser,
  validate(deleteBrandSchema),
  deleteBrand,
);

export { router as brandsRoutes };
