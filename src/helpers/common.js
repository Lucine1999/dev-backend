import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import app from "../app.js";
import { getUserByIdDb } from "../modules/users/db.js";
import { badRequestErrorCreator } from "./errors.js";

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

export const verifyUser = async (req, res, next) => {
  try {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
      res.clearCookie("access-token");

      res.send({
        isAuth: false,
      });
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
        res.status(401).send({ error: "Unauthorized", isAuth: false });
      }
    }

    //user is logged in

    res.locals.isAuth = true;
    res.locals.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export const adminUserCheck = (req, res, next) => {
  if (res.locals.isAuth) {
    const userData = res.locals.user;
    if (userData.data.role === "ADMIN" || userData.data.role === "MAIN_ADMIN") {
      next();
    } else {
      res.status(403).send("Forbidden");
    }
  }
};
export const mainAdminUserCheck = (req, res, next) => {
  if (res.locals.isAuth) {
    const userData = res.locals.user;

    if (userData.data.role === "MAIN_ADMIN") {
      next();
    } else {
      res.status(403).send("Forbidden");
    }
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
  const expirationDate = type === "access" ? "1h" : "30d"; //seconds - minutes

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
  let decoded;

  try {
    decoded = jwt.verify(token, key); //verify to check token is valid or not
  } catch (err) {
    result.error = err;
  }

  if (!decoded) {
    decoded = jwt.decode(token, key);
  }
  result.decode = decoded;

  return result;
};
