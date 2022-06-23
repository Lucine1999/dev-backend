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
} from "./db.js";

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

export const createUser = async (req, res, next) => {
  try {
    const { password, email } = req.body;

    const userExists = await getUserByEmailDb(email);
    if (userExists.data) {
      return res.status(400).send("User with this email already exists");
    }
    const hashedPassword = await hashPassword(password);
    const userData = {
      ...req.body,
      password: hashedPassword,
    };

    const user = await createUserDb(userData);

    const userId = user.data.id;

    const accessToken = signToken(
      {
        id: userId,
      },
      "access",
    );
    const refreshToken = signToken(
      {
        id: userId,
      },
      "refresh",
    );
    await addUserRefreshToken(userId, refreshToken);
    res.cookie("access-token", accessToken, {
      httpOnly: true,
    });
    res.json({ data: user.data, isAuth: true });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmailDb(email);

    if (user.error || !user.data) {
      return res.status(401).send("Invalid username or password");
    }

    const checkPassword = await comparePassword(password, user.data.password);
    if (!checkPassword) {
      res.status(401).send("Invalid username or password");
    }

    const userId = user.data.id;
    const accessToken = signToken(
      {
        id: userId,
      },
      "access",
    );
    const refreshToken = signToken(
      {
        id: userId,
      },
      "refresh",
    );

    await addUserRefreshToken(userId, refreshToken);

    res.cookie("access-token", accessToken, {
      httpOnly: true,
    });
    return res.json({ data: user.data, isAuth: true });
  } catch (err) {
    next(err);
  }
};

export const verifyUser = async (req, res, next) => {
  try {
    const accessToken = req.cookies["access-token"];
    if (!accessToken) {
      res.locals.isAuth = false;
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
