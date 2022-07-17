import { badRequestErrorCreator } from "../../helpers/errors.js";
import {
  getWishlistDB,
  createWishlistItemDB,
  deleteWishlistItemDB,
  getWishlistCountDB,
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
    const wishlistCount = await getWishlistCountDB(res.locals.userId);

    res.json({
      data: { id: createdWishlist.data.id },
      count: wishlistCount,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteWishlistItem = async (req, res, next) => {
  try {
    const deletedItem = await deleteWishlistItemDB(+req.params.wishlistId);
    const wishlistCount = await getWishlistCountDB(res.locals.userId);
    if (deletedItem.data) {
      return res.json({
        data: { id: deletedItem.data?.id },
        count: wishlistCount,
      });
    }

    return next(badRequestErrorCreator());
  } catch (e) {
    next(e);
  }
};

export const getWishlistCount = async (req, res, next) => {
  try {
    if (!res.locals.isAuth) {
      return res.json({
        count: 0,
      });
    }
    const wishlistCount = await getWishlistCountDB(res.locals.userId);

    return res.json({
      count: wishlistCount.data,
    });
  } catch (error) {
    next(error);
  }
};
