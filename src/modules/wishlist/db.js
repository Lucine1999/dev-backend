import { prisma } from "../../services/Prisma.js";

const { wishlist } = prisma;

export const createWishlistItemDB = async (wishlistData) => {
  try {
    const createdWishlist = await wishlist.create({
      data: wishlistData,
    });

    return {
      data: createdWishlist,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};
export const getWishlistDB = async (searchKey) => {
  try {
    const list = await wishlist.findMany({
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

export const deleteWishlistItemIdDB = async (wishlistId) => {
  try {
    const deletedItem = await wishlist.delete({
      where: {
        id: wishlistId,
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
