import { createCategoryDB, getAllCategoriesDB, updateCategoryDB, deleteCategoryDB } from './db.js'
import { responseCategoryCreator } from '../../helpers/common.js'
import { deleteProducstDB } from '../products/db.js'

export const getCategory = async (req, res, next) => {
  try {
    const products = await getAllCategoriesDB()
    res.json(products.data)
  } catch (error) {
    console.log(error.message)
    next(error)
  }
}

export const createCategory = async (req, res, next) => {
  try {
    const brand = req.body
    const createdCategory = await createCategoryDB(brand)

    res.json(responseCategoryCreator(createdCategory))
  } catch (error) {
    console.log(error.message)
    next(error)
  }
}

export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedCategory = await updateCategoryDB(id, req.body)
    res.json(updatedCategory.data)
  } catch (error) {
    console.log(error.message)
    next(error)
  }
}
export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedProducts = await deleteProducstDB(id)
    const deletedCategory = await deleteCategoryDB(id)
    res.json({ deletedCategory, deletedProducts })
  } catch (error) {
    console.log(error.message)
    next(error)
  }
}
