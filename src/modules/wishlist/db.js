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
        product: {
          include: {
            cart: true,
          },
        },
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

export const deleteWishlistItemDB = async (wishlistId) => {
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

export const getWishlistCountDB = async (userId) => {
  try {
    const count = await wishlist.count({
      where: {
        userId,
      },
    });

    return {
      data: count,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};
