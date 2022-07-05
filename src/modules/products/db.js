import { prisma } from "../../services/Prisma.js";

const { product } = prisma;

export const getProductsDB = async (skip, take) => {
  try {
    const products = await product.findMany({
      skip,
      take,
      include: {
        category: true,
        brand: true,
      },
    });
    return products;
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
};

export const getProductsLengthDb = async () => {
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
