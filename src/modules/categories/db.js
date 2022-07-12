import { prisma } from "../../services/Prisma.js";

const { category, product } = prisma;

export const getAllCategoriesDB = async () => {
  try {
    const categories = await category.findMany();
    return {
      data: categories,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
};

export const createCategoryDB = async (categoryData) => {
  try {
    const createdCategory = await category.create({
      data: categoryData,
    });
    return {
      data: createdCategory,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};
export const updateCategoryDB = async (id, data) => {
  try {
    const updatedCategory = await category.update({
      where: {
        id: Number(id),
      },
      data: {
        ...data,
      },
    });
    return {
      data: updatedCategory,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
};
export const deleteCategoryDB = async (id, relatedProductsDelete) => {
  try {
    const deletedCategory = await category.delete({
      where: {
        id: Number(id),
      },
    });

    let updatedProducts;

    if (relatedProductsDelete) {
      updatedProducts = await product.deleteMany({
        where: {
          categoryId: Number(id),
        },
      });
    } else {
      updatedProducts = await product.updateMany({
        where: {
          categoryId: Number(id),
        },
        data: {
          categoryId: null,
        },
      });
    }

    return {
      data: deletedCategory,
      changedProducts: updatedProducts,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
};
