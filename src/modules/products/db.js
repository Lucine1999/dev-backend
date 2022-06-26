import { prisma } from "../../services/Prisma.js";

const { product } = prisma;

export const getAllProductsDB = async (searchKey) => {
  try {
    const products = await product.findMany(searchKey);
    return {
      data: products,
      error: null,
    };
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
    console.log(error);
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
export const deleteProducstByBrandDB = async (id) => {
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
