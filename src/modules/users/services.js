import {
  responseDataCreator,
  hashPassword,
  signToken,
  validTokenCheck,
} from "../../helpers/common.js";
import {
  getAllUsersDb,
  createUserDb,
  getUserByIdDB,
  addUserRefreshToken,
} from "./db.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersDb();
    res.json(responseDataCreator(users));
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    if (!req.params) {
      return next();
    }
    const userData = +req.params.userId;
    const user = await getUserByIdDB(userData);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const createUser = (req, res, next) => {
  try {
    const password = req.body.password;

    hashPassword(password, async (err, hash) => {
      if (err) {
        return next(err);
      }

      const userData = {
        ...req.body,
        password: hash,
      };
      const user = await createUserDb(userData);

      if (user.error) {
        if (user.error.code === "P2002") {
          return res.status(400).send("User with this email already exists");
        }
        return next(user.error);
      }
      const userId = user.data.id;

      const accessToken = signToken({
        id: userId,
      });
      const refreshToken = signToken({
        id: userId,
      });
      await addUserRefreshToken(userId, refreshToken);
      res.cookie("access-token", accessToken, {
        // maxAge: 1 * 60 * 1000,
        httpOnly: true,
      });
      res.json({ accessToken, data: user.data });
    });
  } catch (err) {
    next(err);
  }
};

export const verifyUser = async (req, res, next) => {
  try {
    const accessToken = req.cookies["access-token"];
    if (!accessToken) {
      res.locals.isAuth = false;
      return res.send("123");
      // next();
    }
    const { id, exp } = validTokenCheck(accessToken, "access");
    const user = await getUserByIdDB(id);
    if (Date.now() >= exp * 1000) {
      const accessToken = signToken(id);
      const refreshToken = signToken(id);
      await addUserRefreshToken(id, refreshToken);
      res.cookie("access-token", accessToken, {
        // maxAge: 1 * 60 * 1000,
        httpOnly: true,
      });
    }
    res.locals.isAuth = true;
    res.locals.user = user;
    res.send("456");
  } catch (err) {
    next(err);
  }
};
