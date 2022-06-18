import { Router } from 'express'
// import { validate } from '../../helpers/common.js'
// import validations from './validations.js'
import { createCategory, getCategory} from './services.js'

// const { createProductSchema, getProductByIdSchema } = validations

const router = Router()

router.post('/', createCategory)
router.get('/getCategory',  getCategory)

export { router as categoriesRoutes }
