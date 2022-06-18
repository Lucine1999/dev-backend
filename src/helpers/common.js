import { badRequestErrorCreator } from './errors.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import app from '../app.js'

const secretKey = app.get('secretKey')

export const validate = (schema) => {
  if (typeof schema !== 'object' || schema === null) throw new Error('Schema is not an object')

  return async (req, res, next) => {
    const { params, body } = req
    console.log(params, body)
    try {
      schema.params && (await schema.params.validateAsync(params))
      schema.body && (await schema.body.validateAsync(body))
      return next()
    } catch (error) {
      next(badRequestErrorCreator(error.details))
    }
  }
}

export const responseDataCreator = (data) => ({
  data,
  count: data.length,
})

export const hashPassword = (password, callback) => {
  const saltRounds = 8
  const myPlaintextPassword = password

  bcrypt.hash(myPlaintextPassword, saltRounds, callback)
}

export const signToken = (payload) => {
  const token = jwt.sign(payload, secretKey)

  return token
}

export const validTokenCheck = (token, callback) => {
  jwt.verify(token, secretKey, callback)
}

export const responseProductCreator = (data) => ({
  data,
  message: 'Successfully created a new product!!',
})
export const responseBrandCreator = (data) => ({
  data,
  message: 'Successfully created a new brand!!',
})
export const responseCategoryCreator = (data) => ({
  data,
  message: 'Successfully created a new brand!!',
})
