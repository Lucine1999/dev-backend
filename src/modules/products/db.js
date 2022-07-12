import { prisma } from "../../services/Prisma.js";

const { product } = prisma;

export const getAllProductsCountDB = async () => {
  try {
    const length = await product.count();
    return length;
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
};

export const getProductsDB = async (
  page,
  brands,
  categories,
  min,
  max,
  keyword,
  userId,
  pageType,
) => {
  try {
    const products = await product.findMany({
      where: {
        ...{
          ...(brands.length && {
            brandId: {
              in: brands,
            },
          }),
          ...(categories.length && {
            categoryId: {
              in: categories,
            },
          }),
          price: {
            ...(Number.isInteger(min) && {
              gte: min,
            }),
            ...(Number.isInteger(max) && {
              lte: max,
            }),
          },
          name: {
            ...(keyword && {
              contains: keyword,
            }),
          },
        },
      },
      include: {
        wishlist: !!userId && {
          where: {
            userId,
          },
          select: {
            id: true,
          },
        },
        brand: pageType === "admin",
        category: pageType === "admin",
      },
      skip: (page - 1) * 9,
      take: 9,
    });

    return products;
  } catch (error) {
    console.log(error);
  }
};

export const getFilteredProductsCountDB = async (
  brands,
  categories,
  min,
  max,
  keyword,
) => {
  const productsCount = await product.count({
    where: {
      ...{
        ...(brands.length && {
          brandId: {
            in: brands,
          },
        }),
        ...(categories.length && {
          categoryId: {
            in: categories,
          },
        }),
        price: {
          ...(Number.isInteger(min) && {
            gte: min,
          }),
          ...(Number.isInteger(max) && {
            lte: max,
          }),
        },
        name: {
          ...(keyword && {
            contains: keyword,
          }),
        },
      },
    },
  });
  return productsCount;
};

export const getHighestPriceDB = async () => {
  try {
    const price = await product.aggregate({
      _max: {
        price: true,
      },
    });

    return price._max;
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};

export const createProductDB = async (productData) => {
  try {
    const createdProduct = await product.create({
      data: productData,
    });

    return {
      data: createdProduct,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};

export const updateProductDB = async (id, data) => {
  try {
    const updatedProduct = await product.update({
      where: {
        id: Number(id),
      },
      data: {
        ...data,
      },
    });
    return {
      data: updatedProduct,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
};

export const deleteProductDB = async (id) => {
  try {
    const deletedProduct = await product.delete({
      where: {
        id: Number(id),
      },
    });
    return {
      data: deletedProduct,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
};

export const deleteProducstByCategoryDB = async (id) => {
  try {
    const deletedProducts = await product.deleteMany({
      where: {
        categoryId: Number(id),
      },
    });
    return {
      data: deletedProducts,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
};

export const deleteProductsByBrandDB = async (id) => {
  try {
    const deletedProducts = await product.deleteMany({
      where: {
        brandId: Number(id),
      },
    });
    return {
      data: deletedProducts,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
};

export const getProductByIdDB = async (productId, userId) => {
  try {
    const productById = await product.findUnique({
      where: {
        id: Number(productId),
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
        ...(userId && {
          wishlist: {
            select: {
              id: true,
            },
            where: {
              productId,
              userId,
            },
          },
        }),
      },
    });
    return productById;
  } catch (error) {
    return {
      data: null,
      error: error.message,
    };
  }
};
