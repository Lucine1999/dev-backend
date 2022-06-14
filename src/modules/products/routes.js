import { Router } from 'express'
// import { validate } from '../../helpers/common.js'
// import validations from './validations.js'
import { getAllProducts } from './services.js'

const router = Router()

router.get('/', getAllProducts)

export { router as productsRoutes }
