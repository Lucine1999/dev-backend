import { prisma } from '../../services/Prisma.js'

const { category } = prisma

export const getAllCategoriesDB = async (searchKey) => {
  try {
    const categories = await category.findMany(searchKey)
    return {
      data: categories,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error,
    }
  }
}

export const createCategoryDB = async (categoryData) => {
  try {
   
    const createdCategory = await category.create({
      data: categoryData,
    })
    return {
      data: createdCategory,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      error,
    }
  }
}
