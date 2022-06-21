import { badRequestErrorCreator } from "./errors.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import app from "../app.js";

const accessKey = app.get("accessKey");
const refreshKey = app.get("refreshKey");

export const validate = (schema) => {
  if (typeof schema !== "object" || schema === null)
    throw new Error("Schema is not an object");

  return async (req, res, next) => {
    const { params, body } = req;

    try {
      schema.params && (await schema.params.validateAsync(params));
      schema.body && (await schema.body.validateAsync(body));
      return next();
    } catch (error) {
      next(badRequestErrorCreator(error.details));
    }
  };
};

export const responseDataCreator = (data) => ({
  data,
  count: data.length,
});

export const hashPassword = (password, callback) => {
  const saltRounds = 8;
  const myPlaintextPassword = password;

  bcrypt.hash(myPlaintextPassword, saltRounds, callback);
};

export const signToken = (payload, type) => {
  const key = type === "access" ? accessKey : refreshKey;
  const expirationDate = type === "access" ? 1 * 60 * 1000 : 60 * 60 * 30;
  const token = jwt.sign(payload, key, {
    expiresIn: expirationDate,
  });

  return token;
};

export const validTokenCheck = (token, type) => {
  const key = type === "access" ? accessKey : refreshKey;
  const result = jwt.decode(token, key);
  return result;
};
