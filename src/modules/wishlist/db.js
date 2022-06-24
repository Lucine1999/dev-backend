import { prisma } from "../../services/Prisma.js";

const { wishlist } = prisma;

export const createWishlistDB = async (wishlistData) => {
  console.log(wishlistData);
  try {
    const createdWishlist = await wishlist.create({
      data: wishlistData,
    });
    return {
      data: createdWishlist,
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
export const getWishlistDB = async (searchKey) => {
  try {
    const list = await wishlist.findMany({
      where: {
        userId: searchKey,
      },
    });
    console.log(list, "wishtlist");
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

export const deleteWishlistItemIdDB = async (searchKey) => {
  try {
    const deletedItem = await wishlist.delete({
      where: {
        id: Number(searchKey),
      },
    })
    return {
      data: deletedItem,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error,
    }
  }
}
