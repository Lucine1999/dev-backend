import { badRequestErrorCreator } from "../../helpers/errors.js";
import {
  getCartItemsDB,
  createCartItemDB,
  deleteCartItemIdDB,
  updateCartCountDB,
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
        type: "delete",
        result: "success",
      });
    }

    return next(badRequestErrorCreator());
  } catch (e) {
    next(e);
  }
};
export const updateCartCount = async (req, res, next) => {
  const userId = res.locals.user.data.id;
  try {
    const id = +req.params.id;
    const count = +req.body.count;
    const updatedCount = await updateCartCountDB(id, count);
    const data = await getCartItemsDB(userId)
    res.json({
      data: data,
      type: "update",
      result: "success",
    });
  } catch (error) {
    next(error);
  }
};
