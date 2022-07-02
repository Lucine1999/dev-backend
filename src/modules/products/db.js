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

export const getProductsDB = async (page, brands, categories, min, max) => {
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
        },
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
  page,
  brands,
  categories,
  min,
  max,
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

export const getProductByIdDB = async (id) => {
  try {
    const productFound = await product.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    return {
      data: productFound,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error.message,
    };
  }
};
