import { badRequestErrorCreator } from "../../helpers/errors.js";
import { socketIo } from "../../services/SocketIo.js";
import {
  getOrdersDB,
  createOrderDB,
  deleteOrderByIdDB,
  getOrderByIdDB,
} from "./db.js";
import { createOrderJob } from "../../cronJobs/createOrderJob.js";

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

export const getOrderByID = async (req, res, next) => {
  const { orderId } = req.params;
  const userId = res.locals.user.data.id;
  try {
    const order = await getOrderByIdDB(Number(orderId), userId);
    console.log(order);
    res.status(200).json({
      data: order,
      type: "create",
      result: "success",
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

    socketIo.getIO().emit("orderCreate", {
      action: "orderCreated",
      message: "Your order is being processed.",
    });

    createOrderJob(createdOrder);
    res.status(200).json({
      data: { id: createdOrder.data.id },
      type: "create",
      result: "success",
    });
  } catch (error) {
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
