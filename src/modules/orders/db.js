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
        id: true,
        createdAt: true,
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

export const getOrderByIdDB = async (orderId, userId) => {
  try {
    const orderWithId = await order.findFirst({
      where: {
        userId: userId,
        id: orderId,
      },
      include: {
        orderDetails: {
          select: {
            product: true,
          },
        },
      },
    });
    return {
      data: orderWithId.orderDetails.map(({ product }) => product),
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

export const updateOrderStatusDB = async (orderId) => {
  try {
    const updatedOrder = await order.update({
      where: {
        id: orderId,
      },
      data: {
        isDelivered: true,
      },
    });

    return {
      data: updatedOrder,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};
