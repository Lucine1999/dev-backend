import { createBrandDB, getAllBrandsDB } from './db.js'
import { responseBrandCreator } from '../../helpers/common.js'

export const createBrand = async (req, res, next) => {
  console.log(req.body)
  try {
    const brand = req.body
    const createdProduct = await createBrandDB(brand)
    
    res.json(responseBrandCreator(createdProduct))
  } catch (error) {
    console.log(error.message)
    next(error)
  }
}

export const getBrand = async (req, res, next) => {
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
