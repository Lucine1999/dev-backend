import { responseDataCreator } from '../../helpers/common.js'
import { getAllProductsDB } from './db.js'

export const getAllProducts = async (req, res, next) => {
  try {
    const companies = await getAllProductsDB()
    res.json(responseDataCreator(companies))
  } catch (error) {
    next(error)
  }
}
