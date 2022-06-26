import { Router } from "express";
// import { validate } from '../../helpers/common.js'
// import validations from './validations.js'
import {
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
} from "./services.js";
import { verifyUser } from "../../helpers/common.js";

const router = Router();

router.post("/", createBrand);
router.get("/getBrands", verifyUser, getBrands);
router.put("/update/:id", updateBrand);
router.delete("/delete/:id", deleteBrand);

export { router as brandsRoutes };
