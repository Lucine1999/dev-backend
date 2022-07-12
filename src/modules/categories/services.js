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
      data: createdCategory.data,
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
    });
  } catch (error) {
    next(error);
  }
};
export const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    console.log(req.body);

    let relatedProductsDelete = false;
    if (req.body?.relatedProductsDelete) {
      relatedProductsDelete = req.body.relatedProductsDelete;
    }

    const deletedCategory = await deleteCategoryDB(
      categoryId,
      relatedProductsDelete,
    );

    res.json({
      data: deletedCategory.data,
    });
  } catch (error) {
    next(error);
  }
};
