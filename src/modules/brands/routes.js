import { Router } from 'express'
// import { validate } from '../../helpers/common.js'
// import validations from './validations.js'
import { createBrand, getBrand } from './services.js'

// const { createProductSchema, getProductByIdSchema } = validations

const router = Router()

router.post('/', createBrand)
router.get('/getBrand',  getBrand)

export { router as brandsRoutes }
