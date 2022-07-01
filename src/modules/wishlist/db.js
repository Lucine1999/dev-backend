import { prisma } from "../../services/Prisma.js";

const { wishlist } = prisma;

export const createWishlistDB = async (wishlistData) => {
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
      include:{
        Product:true
      }
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

export const deleteWishlistItemIdDB = async ({ id, userId }) => {
  try {
    const deletedItem = await wishlist.deleteMany({
      where: {
        productId: Number(id),
        userId: Number(userId),
      },
    });
    return {
      data: id,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
};
