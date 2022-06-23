import {
  createCategoryDB,
  getAllCategoriesDB,
  updateCategoryDB,
  deleteCategoryDB,
} from "./db.js";
import { deleteProducstByCategoryDB } from "../products/db.js";

export const getCategories = async (req, res, next) => {
  try {
    const categories = await getAllCategoriesDB();
    res.json(categories.data);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const brand = req.body;
    const createdCategory = await createCategoryDB(brand);

    res.json({
      data: createdCategory,
      message: "Successfully created a new category!!",
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedCategory = await updateCategoryDB(id, req.body);
    res.json(updatedCategory.data);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProducts = await deleteProducstByCategoryDB(id);
    const deletedCategory = await deleteCategoryDB(id);
    res.json({ deletedCategory, deletedProducts });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
