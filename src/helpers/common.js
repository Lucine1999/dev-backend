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

export const responseDataCreator = ({ data }) => ({
  data,
  count: data.length,
});

export const responseProductCreator = (data) => ({
  data,
  message: "Successfully created a new product!!",
});
export const responseBrandCreator = (data) => ({
  data,
  message: "Successfully created a new brand!!",
});
export const responseCategoryCreator = (data) => ({
  data,
  message: "Successfully created a new brand!!",
});

export const hashPassword = async (password) => {
  const saltRounds = 8;
  const myPlaintextPassword = password;

  const hashedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds);
  return hashedPassword;
};

export const comparePassword = async (password, hashedPassword) => {
  const compareResult = await bcrypt.compare(password, hashedPassword);
  return compareResult;
};

export const signToken = (payload, type) => {
  const key = type === "access" ? accessKey : refreshKey;
  const expirationDate = type === "access" ? 60 * 60 : 60 * 60 * 30; //seconds - minutes
  const token = jwt.sign(payload, key, {
    expiresIn: expirationDate,
  });
  return token;
};

export const validTokenCheck = (token, type) => {
  const key = type === "access" ? accessKey : refreshKey;
  const result = {
    decode: {},
    error: null,
  };

  try {
    result.decode = jwt.decode(token, key); //decode to get user id
    jwt.verify(token, key); //verify to check token is valid or not
  } catch (err) {
    result.error = err;
  }

  return result;
};
