import {
  getWishlistDB,
  createWishlistDB,
  deleteWishlistItemIdDB,
} from "./db.js";

export const getWishlist = async (req, res, next) => {
  try {
    const wishlist = await getWishlistDB(req.body.userId);
    res.json(wishlist.data);
  } catch (err) {
    next(err);
  }
};

export const createWishlistItem = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const createdWishlist = await createWishlistDB(reqBody);

    res.json({
      data: createdWishlist,
      message: "Successfully created a new wishlist!!",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteWishlistItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedItem = await deleteWishlistItemIdDB(id);
    res.json(deletedItem.data);
  } catch (e) {
    next(e);
  }
};
