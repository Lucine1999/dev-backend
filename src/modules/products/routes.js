import { Router } from 'express'
import { validate } from '../../helpers/common.js'
import validations from './validations.js'
import { createProduct, getProducts,updateProduct } from './services.js'

const { createProductSchema, getProductByIdSchema } = validations

const router = Router()

router.post('/',  createProduct)
router.get('/getProducts',  getProducts)
router.put('/update/:id',  updateProduct)


export { router as productsRoutes }
