import { prisma } from '../../services/Prisma.js'

const { brand } = prisma

export const getAllBrandsDB = async (searchKey) => {
  try {
    const brands = await brand.findMany(searchKey)
    return {
      data: brands,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error,
    }
  }
}

export const createBrandDB = async (brandData) => {
  try {
    console.log(brandData)
    const createdBrand = await brand.create({
      data: brandData,
    })
    return {
      data: createdBrand,
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
