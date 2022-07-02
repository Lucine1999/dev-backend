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
      user: res.locals.user,
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
      brand: createdBrand,
      user: res.locals.user,
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
      brand: updatedBrand.data,
      user: res.locals.user,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteBrand = async (req, res, next) => {
  try {
    const { brandId } = req.params;
    const deletedBrand = await deleteBrandDB(brandId);

    res.json({
      data: deletedBrand.data,
      user: res.locals.user,
    });
  } catch (error) {
    next(error);
  }
};
