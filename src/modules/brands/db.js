import { prisma } from "../../services/Prisma.js";

const { brand, product } = prisma;

export const getAllBrandsDB = async (keyword) => {
  try {
    const brands = await brand.findMany({
      where: {
        ...{
          name: {
            ...(keyword && {
              contains: keyword,
            }),
          },
        },
      },
    });
    return {
      data: brands,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
};

export const createBrandDB = async (brandData) => {
  try {
    const createdBrand = await brand.create({
      data: brandData,
    });
    return {
      data: createdBrand,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};
export const updateBrandDB = async (id, data) => {
  try {
    const updatedBrand = await brand.update({
      where: {
        id: Number(id),
      },
      data: {
        ...data,
      },
    });
    return {
      data: updatedBrand,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
};
export const deleteBrandDB = async (id, relatedProductsDelete) => {
  try {
    const deletedBrand = await brand.delete({
      where: {
        id: Number(id),
      },
    });

    let updatedProducts;

    if (relatedProductsDelete) {
      updatedProducts = await product.deleteMany({
        where: {
          brandId: Number(id),
        },
      });
    } else {
      updatedProducts = await product.updateMany({
        where: {
          brandId: Number(id),
        },
        data: {
          brandId: null,
        },
      });
    }

    return {
      data: deletedBrand,
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
