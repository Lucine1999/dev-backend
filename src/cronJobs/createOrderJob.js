import { CronJob } from "../services/Cron.js";
import { getCronDate } from "../helpers/getCronDate.js";
import { socketIo } from "../services/SocketIo.js";
import { updateOrderStatusDB } from "../modules/orders/db.js";

export const createOrderJob = (createdOrder) => {
  return new CronJob(
    getCronDate(60000),
    async () => {
      await updateOrderStatusDB(createdOrder.data.id);
      return socketIo.getIO().emit("delivered", {
        action: "isDelivered",
        message: `Your order with ID ${createdOrder.data.id} & with amount ${
          createdOrder.data.amount / 100
        }${createdOrder.data.currency} is already delivered.`,
      });
    },
    null,
    true,
  );
};
