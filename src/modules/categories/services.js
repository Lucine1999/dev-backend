import {
  createCategoryDB,
  getAllCategoriesDB,
  updateCategoryDB,
  deleteCategoryDB,
} from "./db.js";

export const getCategories = async (req, res, next) => {
  try {
    const categories = await getAllCategoriesDB();
    res.json({
      categories: categories.data,
    });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const category = req.body;
    const createdCategory = await createCategoryDB(category);

    res.json({
      data: createdCategory,
      user: res.locals.user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const updatedCategory = await updateCategoryDB(categoryId, req.body);

    res.json({
      data: updatedCategory.data,
      user: res.locals.user,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const deletedCategory = await deleteCategoryDB(categoryId);

    res.json({
      data: deletedCategory.data,
      user: res.locals.user,
    });
  } catch (error) {
    next(error);
  }
};
