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
      brands: brands.data,
      isAuth: res.locals.isAuth,
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
      isAuth: res.locals.isAuth,
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
      isAuth: res.locals.isAuth,
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
      isAuth: res.locals.isAuth,
      user: res.locals.user,
    });
  } catch (error) {
    next(error);
  }
};
