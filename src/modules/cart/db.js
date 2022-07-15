import { prisma } from "../../services/Prisma.js";

const { cart } = prisma;

export const createCartItemDB = async (cartData) => {
  try {
    const createdCartItem = await cart.create({
      data: cartData,
    });

    return {
      data: createdCartItem,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};
export const getCartItemsDB = async (searchKey) => {
  try {
    const list = await cart.findMany({
      where: {
        userId: Number(searchKey),
      },
      include: {
        product: true,
      },
    });
    return {
      data: list,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
};

export const deleteCartItemIdDB = async (cartId) => {
  try {
    const deletedItem = await cart.delete({
      where: {
        id: cartId,
      },
    });

    return {
      data: deletedItem,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
};

export const upsertCartDB = async (cartId, userId, productId, count) => {
  try {
    console.log(cartId);
    const upsertedData = await cart.upsert({
      where: {
        id: cartId,
      },
      update: {
        count,
      },
      create: {
        count,
        userId,
        productId,
      },
    });

    return {
      id: upsertedData.id,
      count: upsertedData.count,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
};
