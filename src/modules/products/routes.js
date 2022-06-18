import { Router } from 'express'
import { validate } from '../../helpers/common.js'
import validations from './validations.js'
import { createProduct, getProduct } from './services.js'

const { createProductSchema, getProductByIdSchema } = validations

const router = Router()

router.post('/', createProduct)
router.get('/getProduct',  getProduct)

export { router as productsRoutes }
