import { prisma } from "../../services/Prisma.js";

const { order } = prisma;

export const getOrdersDB = async (userId) => {
  try {
    const orders = await order.findMany({
      where: {
        userId: userId,
      },
      select: {
        orderDetails: {
          select: {
            product: true,
          },
        },
        amount: true,
        currency: true,
        isDelivered: true,
      },
    });

    return {
      data: orders,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};

export const createOrderDB = async (orderData) => {
  try {
    const createdOrder = await order.create({
      data: {
        userId: orderData.userId,
        amount: orderData.amount,
        currency: orderData.currency,
        orderDetails: {
          create: orderData.productIds.map((productId) => ({
            product: {
              connect: {
                id: productId,
              },
            },
          })),
        },
      },
    });

    return {
      data: createdOrder,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      error,
    };
  }
};

export const deleteOrderByIdDB = async (orderId) => {
  try {
    const deletedOrder = await order.delete({
      where: {
        id: orderId,
      },
    });

    return {
      data: deletedOrder,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};
