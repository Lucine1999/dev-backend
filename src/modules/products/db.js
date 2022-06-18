import { prisma } from '../../services/Prisma.js'

const { product } = prisma

export const getAllProductsDB = async (searchKey) => {
  try {
    const products = await product.findMany(searchKey)
    return {
      data: products,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error,
    }
  }
}

export const createProductDB = async (productData) => {
  console.log('productData', productData)

  try {
    const createdProduct = await product.create({
      data: productData,
    })
    return {
      data: createdProduct,
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
