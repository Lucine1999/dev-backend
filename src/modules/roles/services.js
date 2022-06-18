import { getAllRolesDB, getRoleById } from './db.js'
import { responseDataCreator } from '../../helpers/common.js'

export const getAllRoles = async (req, res, next) => {
  try {
    const roles = await getAllRolesDB()
    res.json(responseDataCreator(roles))
  } catch (error) {
    next(error)
  }
}

export const getRole = async (req, res, next) => {
  try {
    const role = await getRoleById(req.params.roleId)
    res.send(role)
  } catch (error) {
    next(error)
  }
}

// export const createROle
