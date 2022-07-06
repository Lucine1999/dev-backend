import {
  responseDataCreator,
  hashPassword,
  signToken,
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

export const checkUserAuth = (req, res, next) => {
  // console.log(res.locals.user);
  res.send({
    message: "Success",
    isAuth: res.locals.isAuth,
    role: res.locals.user.data.role,
  });
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersDb();
    const userData = responseDataCreator(users);
    res.json({ ...userData, isAuth: res.locals.isAuth });
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
      res.status(400).send({ error: "Bad Request", key: "email" });
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
    res.json({ user: user.data });
  } catch (err) {
    next(err);
  }
};

export const signInUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmailDb(email);

    if (user.error || !user.data) {
      res.status(400).send({ error: "Bad Request", key: "invalidEmail" });
    }

    const checkPassword = await comparePassword(password, user.data.password);
    if (!checkPassword) {
      res.status(400).send({ error: "Bad Request", key: "invalidPassword" });
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
    res.status(200).send({ message: "Success" });
  } catch (err) {
    next(err);
  }
};
