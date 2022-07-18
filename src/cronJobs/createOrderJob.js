import { CronJob } from "../services/Cron.js";
import { getCronDate } from "../helpers/getCronDate.js";
import { socketIo } from "../services/SocketIo.js";

export const createOrderJob = (createdOrder) => {
  return new CronJob(
    getCronDate(),
    () => {
      return socketIo.getIO().emit("delivering", {
        action: "beingDelivered",
        message: `Your order with ID ${createdOrder.data.id} & with amount ${
          createdOrder.data.amount / 100
        }${createdOrder.data.currency} is already on it's way.`,
      });
    },
    null,
    true,
  );
};
