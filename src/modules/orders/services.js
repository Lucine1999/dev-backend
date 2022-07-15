import { badRequestErrorCreator } from "../../helpers/errors.js";
import { getOrdersDB, createOrderDB, deleteOrderByIdDB } from "./db.js";

export const getOrders = async (req, res, next) => {
  const userId = res.locals.user.data.id;
  try {
    const orders = await getOrdersDB(userId);
    res.status(200).json({
      data: orders.data,
    });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const userId = res.locals.user.data.id;
    const { productIds, amount, currency } = req.body;
    const createdOrder = await createOrderDB({
      userId,
      productIds,
      amount,
      currency,
    });
    res.status(200).json({
      data: { id: createdOrder.data.id },
      type: "create",
      result: "success",
    });
  } catch (error) {
    console.log("error is here");
    next(error);
  }
};

export const deleteOrderById = async (req, res, next) => {
  try {
    const orderId = Number(req.params.orderId);
    const deletedOrder = await deleteOrderByIdDB(orderId);
    if (deletedOrder.data) {
      return res.json({
        data: { id: deletedOrder.data?.id },
        type: "delete",
        result: "success",
      });
    }

    return next(badRequestErrorCreator());
  } catch (error) {
    next(error);
  }
};
