import { Router } from "express";
import { createWishlistItem, getWishlist, deleteWishlistItem } from "./services.js";

// import { validate } from '../../helpers/common.js'
// import validations from './validations.js'
// const { createProductSchema, getProductByIdSchema } = validations

const router = Router();

router.post("/", createWishlistItem);
router.get('/getWishlist', getWishlist)
router.delete('/delete/:id', deleteWishlistItem)

export { router as wishlistRoutes };
