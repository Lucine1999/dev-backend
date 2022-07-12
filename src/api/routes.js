import { Router } from "express";
import { productsRoutes } from "../modules/products/routes.js";
import { usersRoutes } from "../modules/users/routes.js";
import { brandsRoutes } from "../modules/brands/routes.js";
import { categoriesRoutes } from "../modules/categories/routes.js";
import { wishlistRoutes } from "../modules/wishlist/routes.js";
import { cartRoutes } from "../modules/cart/routes.js";
const router = Router();

router.use("/products", productsRoutes);
router.use("/users", usersRoutes);
router.use("/brands", brandsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/cart", cartRoutes);

export { router as routes };
