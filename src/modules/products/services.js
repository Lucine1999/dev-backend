import { createProductDB, getAllProductsDB } from './db.js'
import { responseProductCreator, responseDataCreator } from '../../helpers/common.js'

export const createProduct = async (req, res, next) => {
  console.log('req.bodyyyyyyyyyyyyyy', req.body)
  try {
    const product = req.body
    const createdProduct = await createProductDB(product)
    // res.json(responseProductCreator(createdProduct))
    res.send(createdProduct)
    res.json(createdProduct)
  } catch (error) {
    console.log(error.message)
    next(error)
  }
}

export const getProduct = async (req, res, next) => {
  res.send('barev')
  // const productPrice = req.query.min
  // console.log(req.query)

  // let searchKey = undefined

  // if (req.query.min || req.query.max) {
  //   searchKey = {
  //     where: {
  //       price: {
  //         gte: req.query.min && +req.query.min,
  //         lte: req.query.max && +req.query.max,
  //       },
  //     },
  //   }
  // }

  // console.log(searchKey)

  // try {
  //   const companies = await getAllProductsDB(searchKey)
  //   res.json(responseDataCreator(companies))
  // } catch (error) {
  //   next(error)
  // }
}
