import { badRequestErrorCreator } from "../../helpers/errors.js";
import {
  getCartItemsDB,
  deleteCartItemDB,
  upsertCartDB,
  deleteCartItemsDB,
  getCartCountDB,
} from "./db.js";

export const getCartItems = async (req, res, next) => {
  const userId = res.locals.user.data.id;
  try {
    const cartItems = await getCartItemsDB(userId);
    res.status(200).json({ data: cartItems.data });
  } catch (err) {
    next(err);
  }
};

export const deleteCartItem = async (req, res, next) => {
  try {
    const deletedItem = await deleteCartItemDB(+req.params.cartId);
    const cartCount = await getCartCountDB(res.locals.userId);

    if (deletedItem.data) {
      return res.json({
        data: { id: deletedItem.data?.id },
        count: cartCount,
      });
    }

    return next(badRequestErrorCreator());
  } catch (e) {
    next(e);
  }
};
export const upsertCartCount = async (req, res, next) => {
  try {
    const userId = res.locals.user.data.id;
    const cartId = +req.body.cardId;
    const productId = +req.body.productId;
    const count = +req.body.count;

    const upsertedData = await upsertCartDB(cartId, userId, productId, count);
    const cartCount = await getCartCountDB(userId);
    res.json({
      data: upsertedData,
      count: cartCount,
    });
  } catch (error) {
    next(error);
  }
};

export const getCartCount = async (req, res, next) => {
  try {
    if (!res.locals.isAuth) {
      return res.json({
        count: 0,
      });
    }
    const cartCount = await getCartCountDB(res.locals.userId);

    return res.json({
      count: cartCount.data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCartItems = async (req, res, next) => {
  const userId = res.locals.user.data.id;
  try {
    const resultAfterDeletion = await deleteCartItemsDB(userId);
    return res.status(200).json(resultAfterDeletion);
  } catch (error) {
    next(error);
  }
};
