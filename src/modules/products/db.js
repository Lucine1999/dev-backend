import { prisma } from '../../services/Prisma.js'

const { product } = prisma

export const getAllProductsDB = async () => {
  try {
    const products = await product.findMany()
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
