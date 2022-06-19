import { createProductDB, getAllProductsDB, updateProductDB } from './db.js'
import { responseProductCreator, responseDataCreator } from '../../helpers/common.js'

export const createProduct = async (req, res, next) => {
  try {
    const product = req.body
    const createdProduct = await createProductDB(product)
    // res.json(responseProductCreator(createdProduct))
    res.json(createdProduct)
  } catch (error) {
    console.log(error.message)
    next(error)
  }
}

export const getProducts = async (req, res, next) => {
  const products = await getAllProductsDB()

  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const results = {}
  if (endIndex < products.data.length) {
    results.next = {
      page: page + 1,
      limit: limit,
    }
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    }
  }

  results.results = products.data.slice(startIndex, endIndex)

  res.json(results)
}
export const updateProduct = async (req, res, next) => {
  const { id } = req.params
  const updatedProduct = await updateProductDB(id, req.body)
  res.json(updatedProduct.data)
}
