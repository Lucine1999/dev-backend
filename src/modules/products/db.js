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
export const updateProductDB = async (id, data) => {
 
  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: Number(id)
      },
      data: {
       ...data
      },
    });
    return {
      data: updatedProduct,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error,
    }
  }

}
export const deleteProductDB = async (id) => {
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    })
    return {
      data: deletedProduct,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error,
    }
  }
}
