import { prisma } from "../../services/Prisma.js";

const { user } = prisma;

export const getAllUsersDb = async () => {
  try {
    const users = await user.findMany();
    return {
      data: users,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};
export const getUserByIdDB = async (id) => {
  // ??????????? password mez petqa vor get anel
  try {
    const users = await user.findUnique({
      where: {
        id,
      },
    });
    return {
      data: users,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};

export const createUserDb = async (sendedData) => {
  try {
    const newUser = await user.create({
      data: sendedData,
    });
    return {
      data: newUser,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
};

export const addUserRefreshToken = async (id, token) => {
  try {
    const refreshToken = await user.update({
      where: {
        id,
      },
      data: {
        refreshToken: token,
      },
    });
    return {
      data: refreshToken,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};
