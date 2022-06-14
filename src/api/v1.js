import { Router } from 'express'
import { productsRoutes } from '../modules/products/routes.js'
const router = Router()

router.use('/products', productsRoutes)
export { router as v1 }
