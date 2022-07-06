import { badRequestErrorCreator } from "../../helpers/errors.js";
import {
  getWishlistDB,
  createWishlistItemDB,
  deleteWishlistItemIdDB,
} from "./db.js";

export const getWishlist = async (req, res, next) => {
  const userId = res.locals.user.data.id;
  try {
    const wishlist = await getWishlistDB(userId);
    res.status(200).json({ data: wishlist.data });
  } catch (err) {
    next(err);
  }
};

export const createWishlistItem = async (req, res, next) => {
  try {
    const userId = res.locals.user.data.id;
    const productId = +req.body.productId;
    const createdWishlist = await createWishlistItemDB({ productId, userId });

    res.json({
      data: { id: createdWishlist.data.id },
      type: "create",
      result: "success",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteWishlistItem = async (req, res, next) => {
  try {
    const deletedItem = await deleteWishlistItemIdDB(+req.params.wishlistId);
    if (deletedItem.data) {
      return res.json({
        data: { id: deletedItem.data?.id },
        type: "delete",
        result: "success",
      });
    }

    return next(badRequestErrorCreator());
  } catch (e) {
    next(e);
  }
};
