import { prisma } from '../../services/Prisma.js'

const { category, product } = prisma

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
export const updateCategoryDB = async (id, data) => {
  try {
    const updatedCategory = await category.update({
      where: {
        id: Number(id),
      },
      data: {
        ...data,
      },
    })
    return {
      data: updatedCategory,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error,
    }
  }
}
export const deleteCategoryDB = async (id) => {
  try {
   
    const deletedCategory = await category.delete({
      where: {
        id: Number(id),
      },
    })

    return {
      data: { deletedCategory, products },
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error,
    }
  }
}
