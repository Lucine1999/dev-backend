import { prisma } from "../../services/Prisma.js";
import { updateCartCount } from "./services.js";

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

export const updateCartCountDB = async (id, count) => {
  try {
    const updatedCount = await cart.update({
      where: {
        id: Number(id),
      },
      data: {
        count: count,
      },
    });
    return {
      data: updatedCount,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
};
export const totalPriceDB = async() => {
  try{

  }catch(error){
    return {
      data: null,
      error: error,
    };
  }
}
