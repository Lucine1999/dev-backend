import { badRequestErrorCreator } from "../../helpers/errors.js";
import { socketIo } from "../../services/SocketIo.js";
import { getOrdersDB, createOrderDB, deleteOrderByIdDB } from "./db.js";
import { CronJob } from "../../services/Cron.js";
import { getCronDate } from "../../helpers/getCronDate.js";

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

    socketIo.getIO().emit("orderCreate", {
      action: "orderCreated",
      message: "Your order is being processed.",
    });

    new CronJob(
      getCronDate(),
      () => {
        return socketIo.getIO().emit("delivering", {
          action: "beingDelivered",
          message: `Your order by id ${createdOrder.data.id} with amount ${
            createdOrder.data.amount / 100
          }${createdOrder.data.currency} is already on it's way.`,
        });
      },
      null,
      true,
    );
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
