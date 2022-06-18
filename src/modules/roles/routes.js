import { Router } from 'express'
import { validate } from '../../helpers/common.js'
import { getAllRoles, getRole } from './services.js'
import validations from './validations.js'

const { getRoleByIdSchema } = validations

const router = Router()

router.get('/', getAllRoles)
router.get('/:RoleId', validate(getRoleByIdSchema), getRole)
// router.get('/', validate(createRoleSchema), createUser)

export { router as RoleRoutes }
