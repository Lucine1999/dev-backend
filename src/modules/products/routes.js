import { Router } from 'express'
import { validate } from '../../helpers/common.js'
import validations from './validations.js'
import { createProduct, getProducts } from './services.js'

const { createProductSchema, getProductByIdSchema } = validations

const router = Router()

router.post('/',  createProduct)
router.get('/getProducts',  getProducts)

export { router as productsRoutes }
