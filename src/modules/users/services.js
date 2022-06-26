import {
  responseDataCreator,
  hashPassword,
  signToken,
  validTokenCheck,
  comparePassword,
} from "../../helpers/common.js";
import {
  getAllUsersDb,
  createUserDb,
  getUserByIdDb,
  addUserRefreshToken,
  getUserByEmailDb,
  removeUserRefreshToken,
} from "./db.js";

export const checkUserAuth = (req, res) => {
  res.json({ isAuth: res.locals.isAuth, user: res.locals.user });
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersDb();
    const userData = responseDataCreator(users);
    res.json({ ...userData, isAuth: res.locals.isAuth, user: res.locals.user });
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
    const user = await getUserByIdDb(userData);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const signUpUser = async (req, res, next) => {
  try {
    const { password, email } = req.body;

    const userExists = await getUserByEmailDb(email);
    if (userExists.data) {
      return res.send({
        type: "error",
        message: "User with this email already exists",
      });
    }
    const hashedPassword = await hashPassword(password);
    const userData = {
      ...req.body,
      password: hashedPassword,
    };

    const user = await createUserDb(userData);

    const id = user.data.id;

    const accessToken = signToken({ id }, "access");
    const refreshToken = signToken({ id }, "refresh");
    await addUserRefreshToken(id, refreshToken);
    res.cookie("access-token", accessToken, {
      httpOnly: true,
    });
    res.json({ user: user.data, isAuth: true });
  } catch (err) {
    next(err);
  }
};

export const signInUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmailDb(email);
    console.log(user);

    if (user.error || !user.data) {
      return res.send({
        type: "error",
        message: "Invalid username or password",
      });
    }

    const checkPassword = await comparePassword(password, user.data.password);
    if (!checkPassword) {
      return res.send({
        type: "error",
        message: "Invalid username or password",
      });
    }

    const id = user.data.id;
    const accessToken = signToken({ id }, "access");

    const refreshToken = signToken({ id }, "refresh");

    await addUserRefreshToken(id, refreshToken);

    res.cookie("access-token", accessToken, {
      httpOnly: true,
    });
    return res.json({ user: user.data, isAuth: true });
  } catch (err) {
    next(err);
  }
};

export const signOutUser = async (req, res, next) => {
  try {
    const id = req.body.id;
    await removeUserRefreshToken(id);
    res.clearCookie("access-token");
    res.json({
      result: "ok",
      message: "You have successfully signed out!",
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
