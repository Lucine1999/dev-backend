import {
  getWishlistDB,
  createWishlistDB,
  deleteWishlistItemIdDB,
} from "./db.js";

export const getWishlist = async (req, res, next) => {
  console.log(res.locals.isAuth);
  const userId = Number(res.locals.user.data.id);
  try {
    const wishlist = await getWishlistDB(userId);
    res.json(wishlist.data);
  } catch (err) {
    next(err);
  }
};

export const createWishlistItem = async (req, res, next) => {
  try {
    const userId = Number(res.locals.user.data.id);
    const productId = Number(req.params.id);
    const createdWishlist = await createWishlistDB({ productId, userId });

    res.json(createdWishlist.data);
  } catch (error) {
    next(error);
  }
};

export const deleteWishlistItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = Number(res.locals.user.data.id);
    const deletedItem = await deleteWishlistItemIdDB({ id, userId });
    console.log(deletedItem, "deletedItem");
    res.json(deletedItem.data);
  } catch (e) {
    next(e);
  }
};
