import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import app from "../app.js";
import { addUserRefreshToken, getUserByIdDb } from "../modules/users/db.js";

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
      return res.send({
        type: "error",
        message: "Oops! Something went wrong!",
      });
    }
  };
};

export const verifyUser = async (req, res, next) => {
  try {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
      res.locals.isAuth = false;
      res.locals.user = {};
      res.clearCookie("access-token");
      return next();
    }

    const accessTokenCheck = validTokenCheck(accessToken, "access");

    const id = accessTokenCheck.decode.id;

    const user = await getUserByIdDb(id);

    if (accessTokenCheck.error) {
      const refreshTokenCheck = validTokenCheck(
        user.data.refreshToken,
        "refresh",
      );
      if (refreshTokenCheck.error) {
        res.locals.isAuth = false;
        res.locals.user = {};
        return next();
      }
    }

    const newAccessToken = signToken({ id }, "access");
    const newRefreshToken = signToken({ id }, "refresh");

    const updatedUser = await addUserRefreshToken(id, newRefreshToken);
    res.cookie("access-token", newAccessToken, {
      httpOnly: true,
    });
    res.locals.isAuth = true;
    res.locals.user = updatedUser.data;
    return next();
  } catch (err) {
    next(err);
  }
};

export const responseDataCreator = ({ data }) => ({
  data,
  count: data.length,
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
  const expirationDate = type === "access" ? "1 days" : "30 days"; //seconds - minutes

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
