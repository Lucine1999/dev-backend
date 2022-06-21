import { Router } from "express";
import { productsRoutes } from "../modules/products/routes.js";
import { usersRoutes } from "../modules/users/routes.js";
const router = Router();

router.use("/products", productsRoutes);
router.use("/users", usersRoutes);

export { router as routes };
