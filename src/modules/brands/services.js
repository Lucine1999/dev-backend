import {
  createBrandDB,
  getAllBrandsDB,
  updateBrandDB,
  deleteBrandDB,
} from "./db.js";

export const getBrands = async (req, res, next) => {
  try {
    const brands = await getAllBrandsDB();
    res.json({
      data: brands.data,
    });
  } catch (error) {
    next(error);
  }
};

export const createBrand = async (req, res, next) => {
  try {
    const brand = req.body;

    const createdBrand = await createBrandDB(brand);

    res.json({
      data: createdBrand.data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBrand = async (req, res, next) => {
  try {
    const { brandId } = req.params;
    const updatedBrand = await updateBrandDB(brandId, req.body);

    res.json({
      data: updatedBrand.data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBrand = async (req, res, next) => {
  try {
    const { brandId } = req.params;
    let relatedProductsDelete = false;
    if (req.body?.relatedProductsDelete) {
      relatedProductsDelete = req.body.relatedProductsDelete;
    }
    const deletedBrand = await deleteBrandDB(brandId, relatedProductsDelete);

    res.json({
      data: deletedBrand.data,
    });
  } catch (error) {
    next(error);
  }
};
