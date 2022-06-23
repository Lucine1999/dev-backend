import {
  createBrandDB,
  getAllBrandsDB,
  updateBrandDB,
  deleteBrandDB,
} from "./db.js";
import { deleteProducstByBrandDB } from "../products/db.js";

export const createBrand = async (req, res, next) => {
  console.log(req.body);
  try {
    const brand = req.body;
    const createdBrand = await createBrandDB(brand);

    res.json({
      data:createdBrand,
      message: "Successfully created a new brand!!",
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const getBrands = async (req, res, next) => {
  try {
    const brands = await getAllBrandsDB();
    res.json(brands.data);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
export const updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedBrand = await updateBrandDB(id, req.body);
    res.json(updatedBrand.data);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
export const deleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProducts = await deleteProducstByBrandDB(id);
    const deletedBrand = await deleteBrandDB(id);
    res.json({ deletedBrand, deletedProducts });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
