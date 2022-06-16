import {
  responseDataCreator,
  hashPassword,
  signToken,
  validTokenCheck,
} from '../../helpers/common.js'
import { getAllUsersDb, createUserDb, getUserByIdDB } from './db.js'

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersDb()
    res.json(responseDataCreator(users))
  } catch (error) {
    next(error)
  }
}

export const getUserById = async (req, res, next) => {
  try {
    if (!req.params) {
      return next()
    }
    const userData = +req.params.userId
    const user = await getUserByIdDB(userData)
    res.json(user)
  } catch (err) {
    next(err)
  }
}

export const createUser = (req, res, next) => {
  try {
    const password = req.body.password

    hashPassword(password, async (err, hash) => {
      if (err) {
        return next(err)
      }

      const userData = {
        ...req.body,
        password: hash,
      }
      const user = await createUserDb(userData)

      if (user.error) {
        return next(user.error)
      }
      const userIdPayload = {
        id: user.data.id,
      }

      const token = signToken(userIdPayload)
      const tokenResponse = {
        token,
      }

      res.json(tokenResponse)
    })
  } catch (err) {
    next(err)
  }
}

export const verifyUser = (req, res, next) => {
  try {
    if (!req.headers.token) {
      return next()
    }
    const token = req.headers.token

    validTokenCheck(token, (err, decoded) => {
      if (err) {
        return next(err)
      }
      res.send(decoded)
    })
  } catch (err) {
    next(err)
  }
}
