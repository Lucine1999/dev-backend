import { badRequestErrorCreator } from "../../helpers/errors.js";
import {
  getCartItemsDB,
  createCartItemDB,
  deleteCartItemIdDB,
  upsertCartDB,
  deleteCartItemsDB,
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

export const createCartItem = async (req, res, next) => {
  try {
    const userId = res.locals.user.data.id;
    const productId = +req.body.productId;
    const createdCartItem = await createCartItemDB({ productId, userId });
    res.json({
      data: { id: createdCartItem.data.id },
      type: "create",
      result: "success",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCartItem = async (req, res, next) => {
  try {
    const deletedItem = await deleteCartItemIdDB(+req.params.cartId);
    if (deletedItem.data) {
      return res.json({
        data: { id: deletedItem.data?.id },
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

    res.json({
      data: upsertedData,
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
