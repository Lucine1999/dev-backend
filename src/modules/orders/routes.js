import { Router } from "express";
import { getOrders, createOrder, deleteOrderById } from "./services.js";
import { validate, verifyUser } from "../../helpers/common.js";
import validations from "./validations.js";
const { createOrderSchema, deleteOrderByIdSchema } = validations;

const router = Router();

router.get("/", verifyUser, getOrders);
router.post("/", verifyUser, createOrder);
router.delete(
  "/:orderId",
  verifyUser,
  validate(deleteOrderByIdSchema),
  deleteOrderById,
);

export { router as ordersRoutes };
